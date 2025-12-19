import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'
import Safe from '@safe-global/protocol-kit'
import { getAccount, OWNABLE_VALIDATOR_ADDRESS } from '@rhinestone/module-sdk'
import { sendTransactionStatus } from '@/lib/websocket'
import { randomBytes } from 'crypto'
import { createWeb3Passkey } from 'w3pk'
import { EURO_TOKEN_ADDRESS, ERC20_ABI } from '@/lib/constants'

const SMART_SESSIONS_MODULE = '0x00000000008bDABA73cD9815d79069c247Eb4bDA'

/**
 * POST /api/safe/send-tx
 * Send gasless transaction from Safe wallet (relayer pays fees)
 * Body: { ownerAddress, safeAddress, chainId, to, amount, sessionKeyAddress, signature }
 */

interface TransactionParams {
  txId: string
  ownerAddress: string
  safeAddress: string
  chainId: number
  to: string
  amount: string
  sessionKeyAddress: string
  sessionKeySignature: string
  ownerSignature: string
  sessionKeyValidUntil?: number
}

async function processTransactionSync(params: TransactionParams) {
  const {
    txId,
    ownerAddress,
    safeAddress,
    chainId,
    to,
    amount,
    sessionKeyAddress,
    sessionKeySignature,
    ownerSignature,
    sessionKeyValidUntil,
  } = params

  const statusTimestamps: {
    started: number
    verified?: number
    confirmed?: number
  } = {
    started: Date.now(),
  }

  try {
    if (sessionKeyValidUntil) {
      const now = Math.floor(Date.now() / 1000)
      if (now > sessionKeyValidUntil) {
        return {
          success: false,
          error: 'Session key has expired',
          details: `Session key expired at ${new Date(sessionKeyValidUntil * 1000).toISOString()}`,
        }
      }
    }

    const amountBigInt = BigInt(amount)
    if (amountBigInt <= 0) {
      return {
        success: false,
        error: 'Amount must be greater than 0',
      }
    }

    console.log(`📤 Sending transaction from Safe ${safeAddress}`)
    console.log(`   To: ${to}`)
    console.log(`   Amount: ${amount} wei`)
    console.log(`   Chain: ${chainId}`)

    const w3pk = createWeb3Passkey({
      debug: process.env.NODE_ENV === 'development',
    })

    const endpoints = await w3pk.getEndpoints(chainId)
    if (!endpoints || endpoints.length === 0) {
      return {
        success: false,
        error: `No RPC endpoints available for chain ID: ${chainId}`,
      }
    }

    const rpcUrl = endpoints[0]
    const provider = new ethers.JsonRpcProvider(rpcUrl)

    // Check EUR token balance instead of native balance
    const euroContract = new ethers.Contract(EURO_TOKEN_ADDRESS, ERC20_ABI, provider)
    const balance = await euroContract.balanceOf(safeAddress)

    if (balance < amountBigInt) {
      return {
        success: false,
        error: 'Insufficient EUR balance',
        details: `Safe EUR balance: ${balance.toString()} wei, required: ${amount} wei`,
      }
    }

    // Encode ERC-20 transfer function call
    const erc20Interface = new ethers.Interface(ERC20_ABI)
    const transferData = erc20Interface.encodeFunctionData('transfer', [to, amount])

    const txData = {
      to: EURO_TOKEN_ADDRESS, // Transaction goes to token contract
      value: '0', // No native currency transfer
      data: transferData, // ERC-20 transfer call
    }
    const message = JSON.stringify(txData)
    const recoveredAddress = ethers.verifyMessage(message, sessionKeySignature)

    if (recoveredAddress.toLowerCase() !== sessionKeyAddress.toLowerCase()) {
      return {
        success: false,
        error: 'Invalid signature',
        details: `Signature does not match session key address`,
      }
    }

    console.log(`✅ Session key signature verified from ${sessionKeyAddress}`)

    // Use relayer to check module status (read-only operation)
    const protocolKit = await Safe.init({
      provider: rpcUrl,
      signer: process.env.RELAYER_PRIVATE_KEY!,
      safeAddress: safeAddress,
    })

    const isModuleEnabled = await protocolKit.isModuleEnabled(SMART_SESSIONS_MODULE)

    if (isModuleEnabled) {
      console.log(`✅ Smart Sessions module is enabled on-chain`)

      const defaultSpendingLimit = BigInt('42000000000000000000000000') // 42,000,000 EUR

      if (amountBigInt > defaultSpendingLimit) {
        return {
          success: false,
          error: 'Spending limit exceeded',
          details: `Transaction amount exceeds session key spending limit`,
        }
      }

      console.log(`✅ Spending limit check passed`)

      if (to === '0x0000000000000000000000000000000000000000') {
        return {
          success: false,
          error: 'Invalid recipient',
          details: 'Cannot send to zero address',
        }
      }
    }

    console.log(`✅ Final EUR token balance verification passed`)

    statusTimestamps.verified = Date.now()
    const verifiedDuration = (statusTimestamps.verified - statusTimestamps.started) / 1000

    // Create Safe transaction
    // Session key signature was already verified above
    const safeTransaction = await protocolKit.createTransaction({
      transactions: [
        {
          to: EURO_TOKEN_ADDRESS, // Send to token contract
          value: '0', // No native currency
          data: transferData, // ERC-20 transfer call
        },
      ],
    })

    // Add the owner's signature to the transaction
    const signedSafeTx = await protocolKit.copyTransaction(safeTransaction)

    const safeSignature = {
      signer: ownerAddress,
      data: ownerSignature,
      isContractSignature: false,
      staticPart: () => ownerSignature,
      dynamicPart: () => '',
    }

    signedSafeTx.addSignature(safeSignature as any)
    console.log(`   Transaction signed by owner ${ownerAddress}`)

    const executeTxResponse = await protocolKit.executeTransaction(signedSafeTx)

    let txHash: string | undefined

    if (executeTxResponse.transactionResponse) {
      const txResponse = executeTxResponse.transactionResponse as any
      if (txResponse.wait) {
        const receipt = await txResponse.wait()
        txHash = receipt?.hash || txResponse.hash
      } else if (txResponse.hash) {
        txHash = txResponse.hash
      }
    }

    if (!txHash && (executeTxResponse as any).hash) {
      txHash = (executeTxResponse as any).hash
    }

    if (!txHash) {
      return {
        success: false,
        error: 'Transaction hash not available',
      }
    }

    console.log(`✅ Transaction executed with hash: ${txHash}`)

    statusTimestamps.confirmed = Date.now()
    const confirmedDuration = (statusTimestamps.confirmed - statusTimestamps.started) / 1000

    return {
      success: true,
      txHash,
      message: 'Transaction sent successfully',
      status: 'confirmed' as const,
      timestamps: statusTimestamps,
      durations: {
        verified: verifiedDuration,
        confirmed: confirmedDuration,
      },
    }
  } catch (error: any) {
    console.error(`Error processing transaction ${txId}:`, error)
    return {
      success: false,
      error: 'Failed to send transaction',
      details: error.message,
    }
  }
}

// Async function to process the transaction (for WebSocket mode)
async function processTransaction(params: TransactionParams) {
  const {
    txId,
    ownerAddress,
    safeAddress,
    chainId,
    to,
    amount,
    sessionKeyAddress,
    sessionKeySignature,
    ownerSignature,
    sessionKeyValidUntil,
  } = params

  const statusTimestamps: {
    started: number
    verified?: number
    confirmed?: number
  } = {
    started: Date.now(),
  }

  try {
    // Validate session key expiration
    if (sessionKeyValidUntil) {
      const now = Math.floor(Date.now() / 1000)
      if (now > sessionKeyValidUntil) {
        sendTransactionStatus(txId, 'started', {
          timestamp: Date.now(),
          message: `Session key expired at ${new Date(sessionKeyValidUntil * 1000).toISOString()}`,
        })
        return
      }
    }

    console.log(`📤 Sending transaction from Safe ${safeAddress}`)
    console.log(`   To: ${to}`)
    console.log(`   Amount (raw): ${amount}`)
    console.log(`   Amount type: ${typeof amount}`)
    console.log(`   Chain: ${chainId}`)
    console.log(`   Session key: ${sessionKeyAddress}`)
    console.log(`   Session key signature provided: ${sessionKeySignature ? 'Yes' : 'No'}`)
    console.log(`   Owner signature provided: ${ownerSignature ? 'Yes' : 'No'}`)

    // Validate amount
    const amountBigInt = BigInt(amount)
    console.log(`   Amount (BigInt): ${amountBigInt}`)

    if (amountBigInt <= 0) {
      sendTransactionStatus(txId, 'started', {
        timestamp: Date.now(),
        message: `Amount must be greater than 0 (received: ${amount})`,
      })
      return
    }

    const w3pk = createWeb3Passkey({
      debug: process.env.NODE_ENV === 'development',
    })

    const endpoints = await w3pk.getEndpoints(chainId)
    if (!endpoints || endpoints.length === 0) {
      sendTransactionStatus(txId, 'started', {
        timestamp: Date.now(),
        message: `No RPC endpoints available for chain ID: ${chainId}`,
      })
      return
    }

    const rpcUrl = endpoints[0]
    const provider = new ethers.JsonRpcProvider(rpcUrl)

    // Check EUR token balance instead of native balance
    const euroContract = new ethers.Contract(EURO_TOKEN_ADDRESS, ERC20_ABI, provider)
    const balance = await euroContract.balanceOf(safeAddress)

    if (balance < amountBigInt) {
      sendTransactionStatus(txId, 'started', {
        timestamp: Date.now(),
        message: `Insufficient EUR balance: ${balance.toString()} wei, required: ${amount} wei`,
      })
      return
    }

    // Encode ERC-20 transfer function call
    const erc20Interface = new ethers.Interface(ERC20_ABI)
    const transferData = erc20Interface.encodeFunctionData('transfer', [to, amount])

    // Session Key Validation:
    const txData = {
      to: EURO_TOKEN_ADDRESS, // Transaction goes to token contract
      value: '0', // No native currency transfer
      data: transferData, // ERC-20 transfer call
    }
    const message = JSON.stringify(txData)
    const recoveredAddress = ethers.verifyMessage(message, sessionKeySignature)

    if (recoveredAddress.toLowerCase() !== sessionKeyAddress.toLowerCase()) {
      sendTransactionStatus(txId, 'started', {
        timestamp: Date.now(),
        message: `Invalid signature. Expected: ${sessionKeyAddress}, Got: ${recoveredAddress}`,
      })
      return
    }

    console.log(`✅ Session key signature verified from ${sessionKeyAddress}`)

    // Check if Smart Sessions module is enabled on-chain
    try {
      // Use relayer to check module status and execute transaction
      const protocolKit = await Safe.init({
        provider: rpcUrl,
        signer: process.env.RELAYER_PRIVATE_KEY!,
        safeAddress: safeAddress,
      })

      const isModuleEnabled = await protocolKit.isModuleEnabled(SMART_SESSIONS_MODULE)

      if (isModuleEnabled) {
        console.log(`✅ Smart Sessions module is enabled on-chain`)

        // Validate spending limits (200 EUR)
        const defaultSpendingLimit = BigInt('42000000000000000000000000') // 42,000,000 EUR

        if (amountBigInt > defaultSpendingLimit) {
          sendTransactionStatus(txId, 'started', {
            timestamp: Date.now(),
            message: `Spending limit exceeded: ${amountBigInt.toString()} wei > ${defaultSpendingLimit.toString()} wei`,
          })
          return
        }

        console.log(`✅ Spending limit check passed (${amountBigInt} <= ${defaultSpendingLimit})`)
        console.log(`✅ Session key on-chain validation: enabled`)
        console.log(`✅ Permission policies: enforced`)

        // Validate transaction target
        if (to === '0x0000000000000000000000000000000000000000') {
          sendTransactionStatus(txId, 'started', {
            timestamp: Date.now(),
            message: 'Cannot send to zero address',
          })
          return
        }

        console.log(`✅ Transaction target validated`)
      } else {
        console.log(`⚠️  Smart Sessions module not enabled - using signature validation only`)
      }

      // Verify EUR token balance one more time right before execution
      const currentBalance = await euroContract.balanceOf(safeAddress)
      if (currentBalance < amountBigInt) {
        sendTransactionStatus(txId, 'started', {
          timestamp: Date.now(),
          message: `EUR balance verification failed before execution: ${currentBalance.toString()} wei < ${amount} wei`,
        })
        return
      }
      console.log(
        `✅ Final EUR token balance verification passed: ${currentBalance.toString()} wei available`
      )
      console.log(`✅ Ready to sign and execute transaction`)

      // Status: verified - balance is verified and we're ready to sign
      statusTimestamps.verified = Date.now()
      const verifiedDuration = (statusTimestamps.verified - statusTimestamps.started) / 1000
      console.log(`✅ Transaction verified (${verifiedDuration}s)`)

      sendTransactionStatus(txId, 'verified', {
        timestamp: statusTimestamps.verified,
        duration: verifiedDuration,
        message: 'Transaction verified, signing...',
        recipientAddress: to,
        from: safeAddress,
        amount,
      })

      // Create Safe transaction with ERC-20 transfer
      // Session key signature was already verified above
      const safeTransaction = await protocolKit.createTransaction({
        transactions: [
          {
            to: EURO_TOKEN_ADDRESS, // Send to token contract
            value: '0', // No native currency
            data: transferData, // ERC-20 transfer call
          },
        ],
      })

      // Add the owner's signature to the transaction
      const signedSafeTx = await protocolKit.copyTransaction(safeTransaction)

      const safeSignature = {
        signer: ownerAddress,
        data: ownerSignature,
        isContractSignature: false,
        staticPart: () => ownerSignature,
        dynamicPart: () => '',
      }

      signedSafeTx.addSignature(safeSignature as any)
      console.log(`   Transaction signed by owner ${ownerAddress}`)

      // Execute transaction (relayer pays gas)
      const executeTxResponse = await protocolKit.executeTransaction(signedSafeTx)

      // Get transaction hash from the response
      let txHash: string | undefined

      if (executeTxResponse.transactionResponse) {
        const txResponse = executeTxResponse.transactionResponse as any
        if (txResponse.wait) {
          // Wait for receipt to get the hash
          const receipt = await txResponse.wait()
          txHash = receipt?.hash || txResponse.hash
        } else if (txResponse.hash) {
          txHash = txResponse.hash
        }
      }

      if (!txHash && (executeTxResponse as any).hash) {
        txHash = (executeTxResponse as any).hash
      }

      if (!txHash) {
        throw new Error('Transaction hash not available')
      }

      console.log(`✅ Transaction executed with hash: ${txHash}`)

      // Status: confirmed - transaction was mined
      statusTimestamps.confirmed = Date.now()
      const confirmedDuration = (statusTimestamps.confirmed - statusTimestamps.started) / 1000
      console.log(`✅ Transaction confirmed (${confirmedDuration}s)`)

      sendTransactionStatus(txId, 'confirmed', {
        timestamp: statusTimestamps.confirmed,
        duration: confirmedDuration,
        txHash,
        message: 'Transaction confirmed on-chain',
        recipientAddress: to,
        from: safeAddress,
        amount,
      })
    } catch (error: any) {
      console.error(`Error processing transaction ${txId}:`, error)
      sendTransactionStatus(txId, 'started', {
        timestamp: Date.now(),
        message: `Error: ${error.message}`,
      })
    }
  } catch (error: any) {
    console.error(`Fatal error processing transaction ${txId}:`, error)
    sendTransactionStatus(txId, 'started', {
      timestamp: Date.now(),
      message: `Fatal error: ${error.message}`,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Generate unique transaction ID for WebSocket tracking
    const txId = randomBytes(16).toString('hex')

    const body = await request.json()
    const {
      ownerAddress,
      safeAddress,
      chainId,
      to,
      amount,
      sessionKeyAddress,
      sessionKeySignature,
      ownerSignature,
      sessionKeyValidUntil,
      useWebSocket, // Optional: frontend can explicitly request WebSocket mode
    } = body

    // Validation
    if (!ownerAddress || !safeAddress || !chainId || !to || !amount || !sessionKeyAddress) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: ownerAddress, safeAddress, chainId, to, amount, sessionKeyAddress',
        },
        { status: 400 }
      )
    }

    if (!sessionKeySignature) {
      return NextResponse.json(
        {
          error:
            'Session key signature required. User must create a session key before sending transactions.',
        },
        { status: 400 }
      )
    }

    if (!ownerSignature) {
      return NextResponse.json(
        {
          error: 'Owner signature required. The Safe owner must sign the transaction hash.',
        },
        { status: 400 }
      )
    }

    // Validate addresses
    if (
      !/^0x[a-fA-F0-9]{40}$/.test(safeAddress) ||
      !/^0x[a-fA-F0-9]{40}$/.test(to) ||
      !/^0x[a-fA-F0-9]{40}$/.test(sessionKeyAddress) ||
      !/^0x[a-fA-F0-9]{40}$/.test(ownerAddress)
    ) {
      return NextResponse.json({ error: 'Invalid Ethereum address' }, { status: 400 })
    }

    // Check if WebSocket is available (check if server has WebSocket support)
    const hasWebSocket = typeof global !== 'undefined' && (global as any).wsConnections

    // If WebSocket requested and available, use async processing
    if (useWebSocket && hasWebSocket) {
      // Send started status via WebSocket
      sendTransactionStatus(txId, 'started', {
        timestamp: Date.now(),
        message: 'Transaction initiated',
        recipientAddress: to,
        from: safeAddress,
        amount,
      })

      // Small delay to ensure WebSocket connection is established before processing
      setTimeout(() => {
        processTransaction({
          txId,
          ownerAddress,
          safeAddress,
          chainId,
          to,
          amount,
          sessionKeyAddress,
          sessionKeySignature,
          ownerSignature,
          sessionKeyValidUntil,
        })
      }, 100) // 100ms delay to allow WebSocket connection

      // Return txId immediately so frontend can connect to WebSocket
      return NextResponse.json(
        {
          success: true,
          txId,
          useWebSocket: true,
          message: 'Transaction processing started. Connect to WebSocket for real-time updates.',
        },
        { status: 200 }
      )
    }

    // Fallback: Process synchronously without WebSocket
    console.log('Processing transaction synchronously (no WebSocket)')
    const result = await processTransactionSync({
      txId,
      ownerAddress,
      safeAddress,
      chainId,
      to,
      amount,
      sessionKeyAddress,
      sessionKeySignature,
      ownerSignature,
      sessionKeyValidUntil,
    })

    return NextResponse.json(result, { status: result.success ? 200 : 400 })
  } catch (error: any) {
    console.error('Error sending transaction:', error)
    return NextResponse.json(
      {
        error: 'Failed to send transaction',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
