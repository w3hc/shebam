import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { createWeb3Passkey } from 'w3pk'
import { EURO_TOKEN_ADDRESS, ERC20_ABI } from '@/lib/constants'
import { getRandomEndpoint } from '@/lib/rpcUtils'

/**
 * POST /api/safe/faucet
 * Mint EUR tokens to a Safe wallet
 * Body: { safeAddress: string, chainId: number }
 */

// Increase timeout for blockchain transaction confirmation
export const maxDuration = 300 // 5 minutes

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { safeAddress, chainId } = body

    if (!safeAddress || !chainId) {
      return NextResponse.json(
        { error: 'Missing required fields: safeAddress, chainId' },
        { status: 400 }
      )
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(safeAddress)) {
      return NextResponse.json({ error: 'Invalid Ethereum address' }, { status: 400 })
    }

    console.log(`💶 Minting 10,000 EUR to Safe ${safeAddress}`)

    const w3pk = createWeb3Passkey({
      debug: process.env.NODE_ENV === 'development',
    })

    const endpoints = await w3pk.getEndpoints(chainId)
    if (!endpoints || endpoints.length === 0) {
      return NextResponse.json(
        { error: `No RPC endpoints available for chain ID: ${chainId}` },
        { status: 400 }
      )
    }

    const rpcUrl = getRandomEndpoint(endpoints)
    const provider = new ethers.JsonRpcProvider(rpcUrl)
    const relayerWallet = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY!, provider)

    // Mint 10,000 EUR tokens
    const euroContract = new ethers.Contract(EURO_TOKEN_ADDRESS, ERC20_ABI, relayerWallet)
    const mintAmount = ethers.parseUnits('10000', 18) // 10,000 EUR with 18 decimals

    // Get current nonce and gas price to avoid replacement issues
    const [latestNonce, pendingNonce] = await Promise.all([
      provider.getTransactionCount(relayerWallet.address, 'latest'),
      provider.getTransactionCount(relayerWallet.address, 'pending'),
    ])

    // If there are pending transactions, wait a bit and retry
    if (pendingNonce > latestNonce) {
      console.log(`⏳ Waiting for ${pendingNonce - latestNonce} pending transaction(s) to clear...`)
      return NextResponse.json(
        {
          error: 'Please wait',
          details:
            'A previous mint transaction is still being processed. Please try again in a few seconds.',
        },
        { status: 429 } // Too Many Requests
      )
    }

    const feeData = await provider.getFeeData()

    const mintTx = await euroContract.mint(safeAddress, mintAmount, {
      nonce: pendingNonce,
      maxFeePerGas: feeData.maxFeePerGas ? (feeData.maxFeePerGas * 120n) / 100n : undefined,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
        ? (feeData.maxPriorityFeePerGas * 120n) / 100n
        : undefined,
    })

    console.log(`📤 Transaction sent: ${mintTx.hash}`)
    console.log(`✅ Mint transaction submitted successfully`)

    // Don't wait for confirmation - return immediately
    // The transaction will be mined in the background
    return NextResponse.json({
      success: true,
      safeAddress,
      amount: '10000',
      txHash: mintTx.hash,
      message: 'Mint transaction submitted - it will be confirmed shortly',
    })
  } catch (error: any) {
    console.error('Error minting EUR tokens:', error)
    return NextResponse.json(
      {
        error: 'Failed to mint EUR tokens',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
