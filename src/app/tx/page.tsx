'use client'

import {
  Container,
  VStack,
  Box,
  Heading,
  Text,
  HStack,
  Badge,
  IconButton,
  Alert,
  CloseButton,
} from '@chakra-ui/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { Dialog, Portal } from '@/components/ui/dialog'
import { Tooltip } from '@/components/ui/tooltip'
import { NumberInput } from '@/components/ui/number-input'
import { Field } from '@/components/ui/field'
import { useW3PK } from '@/context/W3PK'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ethers } from 'ethers'
import { FiSend, FiCopy, FiRefreshCw } from 'react-icons/fi'
import { QRCodeSVG } from 'qrcode.react'
import { TransactionHistory } from '../../components/TransactionHistory'
import { SafeStorage, Transaction } from '@/lib/safeStorage'
import { useSafeTransactionHistory } from '@/hooks/useSafeTransactionHistory'
import { EURO_TOKEN_ADDRESS, ERC20_ABI } from '@/lib/constants'
import { FaSatellite, FaQrcode } from 'react-icons/fa'
import { brandColors } from '@/theme'
import { useTranslation } from '@/hooks/useTranslation'

interface SessionKey {
  sessionKeyAddress: string
  sessionKeyIndex: number
  expiresAt: string
  permissions: {
    spendingLimit: string
    allowedTokens: string[]
    validAfter: number
    validUntil: number
  }
}

export default function PaymentPage() {
  const { isAuthenticated, user, deriveWallet } = useW3PK()
  const t = useTranslation()

  // State
  const [safeAddress, setSafeAddress] = useState<string | null>(null)
  const [safeBalance, setSafeBalance] = useState<string>('0')
  const [sessionKey, setSessionKey] = useState<SessionKey | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isCooldown, setIsCooldown] = useState(false)
  const cooldownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [userAddress, setUserAddress] = useState<string | null>(null)
  const [deploymentBlock, setDeploymentBlock] = useState<number | undefined>(undefined)
  const [isRefetchingAfterConfirmation, setIsRefetchingAfterConfirmation] = useState(false)
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([])
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const insufficientBalanceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [recipient, setRecipient] = useState('0x502fb0dFf6A2adbF43468C9888D1A26943eAC6D1')
  const [amount, setAmount] = useState('1')
  const [paymentRequestDetected, setPaymentRequestDetected] = useState(false)

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const onRequestModalOpen = () => setIsRequestModalOpen(true)
  const onRequestModalClose = () => setIsRequestModalOpen(false)
  const [requestAmount, setRequestAmount] = useState<string>('')
  const [isQRGenerated, setIsQRGenerated] = useState<boolean>(false)
  const [qrData, setQrData] = useState<string>('')
  const [isWebNFCSupported, setIsWebNFCSupported] = useState(false)
  const [qrSize, setQrSize] = useState(200)

  // Refs to access latest values in WebSocket handler without causing re-renders
  const requestAmountRef = useRef<string>('')
  const qrDataRef = useRef<string>('')
  const isRequestModalOpenRef = useRef<boolean>(false)

  // Keep refs in sync with state
  useEffect(() => {
    requestAmountRef.current = requestAmount
  }, [requestAmount])

  useEffect(() => {
    qrDataRef.current = qrData
  }, [qrData])

  useEffect(() => {
    isRequestModalOpenRef.current = isRequestModalOpen
  }, [isRequestModalOpen])

  // Check NFC support and set QR size after mount (client-side only)
  useEffect(() => {
    const checkNFCSupport = () => {
      if (typeof window === 'undefined') {
        setIsWebNFCSupported(false)
        return
      }

      // Set QR size based on screen width
      setQrSize(window.innerWidth < 768 ? 150 : 200)

      // Check if running on HTTPS or localhost (required for NFC)
      const isSecureContext = window.isSecureContext
      if (!isSecureContext) {
        console.warn('NFC requires HTTPS or localhost')
        setIsWebNFCSupported(false)
        return
      }

      // Check if both NDEFReader AND NDEFWriter are available
      // Note: Some devices have Reader but not Writer due to hardware/manufacturer restrictions
      const hasNDEFReader = 'NDEFReader' in window
      const hasNDEFWriter = 'NDEFWriter' in (window as any)
      const hasNFC = hasNDEFReader && hasNDEFWriter
      setIsWebNFCSupported(hasNFC)

      if (hasNFC) {
        console.log('✅ NFC Write is supported on this device')
      } else if (hasNDEFReader && !hasNDEFWriter) {
        console.log('⚠️ NFC Read is supported but NFC Write is not available (NDEFWriter missing)')
      } else {
        console.log('❌ NFC is not supported on this device')
      }
    }

    checkNFCSupport()

    // Update QR size on window resize
    const handleResize = () => {
      setQrSize(window.innerWidth < 768 ? 150 : 200)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const writeNFC = async (url: string) => {
    if (!isWebNFCSupported) {
      toaster.create({
        title: t.tx.nfcWriteNotAvailable,
        description: t.tx.nfcWriteNotAvailableDesc,
        type: 'warning',
        duration: 5000,
      })
      return
    }

    try {
      // Cast to any because NDEFWriter isn't in TypeScript DOM lib yet
      const NDEFWriter = (window as any).NDEFWriter
      if (!NDEFWriter) {
        throw new Error('NDEFWriter not available')
      }

      const writer = new NDEFWriter()

      console.log('Writing to NFC tag:', url)

      await writer.write({
        records: [{ recordType: 'url', data: url }],
      })

      toaster.create({
        title: t.tx.nfcWritten,
        description: t.tx.nfcWrittenDesc,
        type: 'success',
        duration: 3000,
      })
    } catch (error: any) {
      console.error('NFC write failed:', error)
      let message = error.message || t.tx.failedToGenerateQR

      if (error.name === 'NotAllowedError') {
        message = t.tx.nfcPermissionDenied
      } else if (error.name === 'NotSupportedError') {
        message = t.tx.nfcNotSupported
      } else if (error.name === 'NotReadableError') {
        message = t.tx.cannotReadNFC
      } else if (message.includes('aborted') || error.name === 'AbortError') {
        message = t.tx.operationCanceled
      } else if (message.includes('no tag')) {
        message = t.tx.noNFCTagDetected
      }

      toaster.create({
        title: t.tx.nfcWriteFailed,
        description: message,
        type: 'error',
        duration: 5000,
      })
    }
  }

  // Check if session key is expired
  const isSessionKeyExpired = sessionKey
    ? Date.now() > sessionKey.permissions.validUntil * 1000
    : false

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimeoutRef.current) {
        clearTimeout(cooldownTimeoutRef.current)
      }
    }
  }, [])

  // Load saved Safe data from localStorage
  useEffect(() => {
    if (isAuthenticated && user && user.ethereumAddress) {
      const saved = localStorage.getItem(`safe_${user.id}`)
      if (saved) {
        const data = JSON.parse(saved)
        setSafeAddress(data.safeAddress)
        if (data.sessionKey) {
          setSessionKey(data.sessionKey)
        }
      }

      // Using user.ethereumAddress directly
      const userAddr = user.ethereumAddress
      setUserAddress(userAddr)

      const safeData = SafeStorage.getSafeData(userAddr, 10200)
      if (safeData?.deploymentBlockNumber) {
        setDeploymentBlock(safeData.deploymentBlockNumber)
      }
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    return () => {
      if (insufficientBalanceTimeoutRef.current) {
        clearTimeout(insufficientBalanceTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const urlParams = new URLSearchParams(window.location.search)
    const recipientParam = urlParams.get('recipient')
    const valueParam = urlParams.get('value')
    const tokenParam = urlParams.get('token')

    if (
      recipientParam &&
      valueParam &&
      tokenParam &&
      ethers.isAddress(recipientParam) &&
      !isNaN(Number(valueParam)) &&
      ethers.isAddress(tokenParam) &&
      tokenParam.toLowerCase() === EURO_TOKEN_ADDRESS.toLowerCase()
    ) {
      try {
        const amountInEth = ethers.formatEther(valueParam)
        setRecipient(recipientParam)
        setAmount(amountInEth)
        setPaymentRequestDetected(true)
      } catch (e) {
        console.warn('Invalid value parameter:', valueParam)
      }
    }
  }, [])

  // Load transaction history from blockchain
  const {
    transactions,
    isLoading: isLoadingTransactions,
    isError: isTransactionError,
    error: transactionError,
    refetch: refetchTransactions,
    lastUpdated: transactionsLastUpdated,
  } = useSafeTransactionHistory({
    safeAddress,
    userAddress,
    chainId: 10200,
    deploymentBlockNumber: deploymentBlock,
    enabled: !!safeAddress && !!userAddress,
  })

  const updateBalanceOptimistically = useCallback((deltaWei: string) => {
    setSafeBalance(prev => {
      const prevBN = ethers.getBigInt(prev || '0')
      const deltaBN = ethers.getBigInt(deltaWei)
      const newBalance = prevBN + deltaBN
      return newBalance.toString()
    })
  }, [])

  // Load Safe balance
  const loadBalance = useCallback(async () => {
    if (!safeAddress) return
    setIsLoadingBalance(true)

    try {
      const response = await fetch('/api/safe/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          safeAddress,
          chainId: 10200, // Gnosis Chiado
        }),
      })

      const data = await response.json()
      if (data.success) {
        setSafeBalance(data.balance)
      }
    } catch (error) {
      console.error('Error loading balance:', error)
    } finally {
      setIsLoadingBalance(false)
    }
  }, [safeAddress])

  // Handle payment request modal close
  const handleRequestModalClose = useCallback(() => {
    setRequestAmount('')
    setIsQRGenerated(false)
    setQrData('')
    onRequestModalClose()
  }, [onRequestModalClose])

  useEffect(() => {
    if (safeAddress) {
      loadBalance()
    }
  }, [safeAddress, loadBalance])

  // Listen for incoming transactions to this Safe address
  useEffect(() => {
    if (!safeAddress) return

    // Connect WebSocket to listen for incoming transactions (start immediately on page load)
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const host = window.location.host
    const ws = new WebSocket(`${protocol}//${host}/api/ws/tx-status?recipient=${safeAddress}`)

    console.log('WebSocket connected for incoming transactions to:', safeAddress)

    ws.onmessage = async event => {
      const update = JSON.parse(event.data)
      console.log('Incoming transaction update:', update)

      if (update.isIncoming) {
        const amountEth = ethers.formatEther(update.amount || '0')

        // Check if this is a self-send (sender is also the Safe address)
        const isSelfSend = update.from?.toLowerCase() === safeAddress.toLowerCase()

        if (update.status === 'verified') {
          // Auto-close payment request modal if it's open and amount matches
          if (isRequestModalOpenRef.current && requestAmountRef.current && qrDataRef.current) {
            try {
              const requestedAmountWei = ethers.parseEther(requestAmountRef.current).toString()
              const receivedAmountWei = update.amount || '0'

              // Close modal if the received amount matches the requested amount
              if (requestedAmountWei === receivedAmountWei) {
                console.log('Auto-closing payment request modal - payment received!')
                handleRequestModalClose()
              }
            } catch (error) {
              console.error('Error comparing amounts for modal auto-close:', error)
            }
          }

          // Skip adding to pending if it's a self-send (already added by outgoing WebSocket)
          if (!isSelfSend) {
            toaster.create({
              title: t.tx.paid,
              description: t.tx.paidDesc
                .replace('{amount}', amountEth)
                .replace('{address}', update.from?.slice(0, 10) || ''),
              type: 'success',
              duration: 5000,
              // containerStyle: {
              //   bg: 'blue.500',
              // },
            })

            // Optimistically increase balance
            const incomingAmount = update.amount || '0'
            updateBalanceOptimistically(incomingAmount)
            // Create a transaction history item with 'verified' status for the receiver
            const newIncomingTransaction: Transaction = {
              txId: `incoming-${Date.now()}`, // Temporary ID until we get the real tx hash
              txHash: update.txHash || undefined,
              from: update.from || '',
              to: safeAddress,
              amount: update.amount || '0',
              timestamp: Date.now(),
              status: 'verified',
              direction: 'incoming',
              duration: update.duration,
            }

            setPendingTransactions(prev => [newIncomingTransaction, ...prev])
          }

          // Start showing refetch loader (only for non-self-sends, as self-sends are handled by outgoing)
          if (!isSelfSend) {
            setIsRefetchingAfterConfirmation(true)
          }
        } else if (update.status === 'confirmed') {
          // Skip processing if it's a self-send (already handled by outgoing WebSocket)
          if (!isSelfSend) {
            // toast({
            //   title: '✅ Settled!',
            //   description: `${amountEth} EUR payment settled onchain in ${update.duration?.toFixed(2)}s`,
            //   status: 'info',
            //   duration: 8000,
            //   // containerStyle: {
            //   //   bg: 'green.500',
            //   // },
            // })

            // Update the pending transaction to 'confirmed' status
            setPendingTransactions(prev =>
              prev.map(tx =>
                tx.direction === 'incoming' && tx.status === 'verified'
                  ? {
                      ...tx,
                      status: 'confirmed',
                      txHash: update.txHash || tx.txHash,
                      duration: update.duration,
                    }
                  : tx
              )
            )

            // Reload transactions after receiving payment (wait for Blockscout indexing)
            setTimeout(() => {
              refetchTransactions().then(() => {
                // Stop showing refetch loader after refetch completes
                setIsRefetchingAfterConfirmation(false)
                // Remove the pending incoming transaction once it's fetched from blockchain
                setPendingTransactions(prev =>
                  prev.filter(tx => !(tx.direction === 'incoming' && tx.status === 'confirmed'))
                )
              })
              loadBalance()
            }, 5000) // Wait 5 seconds for Blockscout to index
          }
        }
      }
    }

    ws.onerror = error => {
      console.error('WebSocket error for incoming transactions:', error)
    }

    ws.onopen = () => {
      console.log('Listening for incoming transactions to:', safeAddress)
    }

    // Cleanup on unmount
    return () => {
      console.log('Closing WebSocket for incoming transactions')
      ws.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeAddress])

  const getTxBaseUrl = () => {
    if (typeof window === 'undefined') return 'https://shebam.w3hc.org/tx/'

    // Check if we're in development (localhost)
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.port === '3000'
    ) {
      return 'http://localhost:3000/tx/'
    }

    // Otherwise, assume production
    return 'https://shebam.w3hc.org/tx/'
  }

  const generatePaymentRequestUrl = (
    recipient: string,
    amountInWei: string,
    tokenAddress: string
  ) => {
    const baseUrl = getTxBaseUrl()
    const params = new URLSearchParams({
      recipient,
      value: amountInWei,
      token: tokenAddress,
    })
    return `${baseUrl}?${params.toString()}`
  }

  const sendTransaction = async () => {
    if (isCooldown) {
      toaster.create({
        title: t.tx.pleaseWait,
        description: t.tx.transactionInProgress,
        type: 'info',
        duration: 3000,
      })
      return
    }

    if (!safeAddress || !sessionKey || !recipient || !amount) {
      toaster.create({
        title: t.tx.error,
        description: t.tx.fillAllFields,
        type: 'error',
        duration: 5000,
      })
      return
    }

    if (isSessionKeyExpired) {
      toaster.create({
        title: t.tx.sessionKeyExpired,
        description: t.tx.sessionKeyExpiredDesc,
        type: 'error',
        duration: 5000,
      })
      return
    }

    const transferAmount = ethers.parseEther(amount)
    const balanceBN = ethers.getBigInt(safeBalance || '0')
    if (transferAmount > balanceBN) {
      setInsufficientBalance(true)

      if (insufficientBalanceTimeoutRef.current) {
        clearTimeout(insufficientBalanceTimeoutRef.current)
      }

      insufficientBalanceTimeoutRef.current = setTimeout(() => {
        setInsufficientBalance(false)
        insufficientBalanceTimeoutRef.current = null
      }, 5000)

      return
    }

    setIsSending(true)
    setIsCooldown(true)

    if (cooldownTimeoutRef.current) {
      clearTimeout(cooldownTimeoutRef.current)
    }

    cooldownTimeoutRef.current = setTimeout(() => {
      setIsCooldown(false)
      cooldownTimeoutRef.current = null
    }, 3000)

    try {
      // Encode ERC-20 transfer function call
      const erc20Interface = new ethers.Interface(ERC20_ABI)
      const transferAmount = ethers.parseEther(amount).toString()
      const transferData = erc20Interface.encodeFunctionData('transfer', [
        recipient,
        transferAmount,
      ])

      // Prepare transaction data (must match backend format for signature verification)
      const txData = {
        to: EURO_TOKEN_ADDRESS, // Transaction goes to token contract
        value: '0', // No native currency transfer
        data: transferData, // ERC-20 transfer call
      }

      // Get the user's address from the authenticated user
      if (!user?.ethereumAddress) {
        throw new Error('User address not available')
      }

      // Derive the session key wallet to sign the transaction (using YOLO mode)
      const sessionKeyWallet = await deriveWallet('YOLO', 'BONUS')

      if (!sessionKeyWallet.privateKey) {
        throw new Error('Session key private key not available')
      }

      // Sign with the session key's private key
      const message = JSON.stringify(txData)
      const sessionKeySigner = new ethers.Wallet(sessionKeyWallet.privateKey)
      const signature = await sessionKeySigner.signMessage(message)

      // Get derived wallet for signing (using YOLO mode with SHEBAM tag)
      const wallet0 = await deriveWallet('YOLO', 'SHEBAM')

      if (!wallet0.privateKey) {
        throw new Error('Owner wallet private key not available')
      }

      // Try WebSocket mode first, fall back to sync mode
      const response = await fetch('/api/safe/send-tx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAddress: wallet0.address,
          safeAddress,
          chainId: 10200,
          to: recipient,
          amount: transferAmount, // Send the EUR token amount
          sessionKeyAddress: sessionKey.sessionKeyAddress,
          sessionKeyValidUntil: sessionKey.permissions.validUntil,
          userPrivateKey: wallet0.privateKey,
          signature,
          useWebSocket: true, // Request WebSocket mode
        }),
      })

      const data = await response.json()

      if (data.success && data.useWebSocket && data.txId) {
        // WebSocket mode - connect for real-time updates
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
        const host = window.location.host
        const ws = new WebSocket(`${protocol}//${host}/api/ws/tx-status?txId=${data.txId}`)

        ws.onmessage = async event => {
          const update = JSON.parse(event.data)
          console.log('WebSocket update:', update)

          if (update.status === 'verified') {
            toaster.create({
              title: t.tx.sent,
              description: t.tx.verifiedIn.replace(
                '{duration}',
                update.duration?.toFixed(2) || '0'
              ),
              type: 'success',
              duration: 4000,
              // containerStyle: {
              //   bg: 'green.500',
              // },
            })

            if (window.history && window.history.replaceState) {
              const cleanUrl = window.location.pathname
              window.history.replaceState({}, '', cleanUrl)
            }

            // Optimistically reduce balance
            const transferAmount = ethers.parseEther(amount).toString()
            updateBalanceOptimistically(`-${transferAmount}`)
            setPaymentRequestDetected(false)
            setRecipient('0x502fb0dFf6A2adbF43468C9888D1A26943eAC6D1')
            setAmount('1')

            // Create a transaction history item with 'verified' status
            const newTransaction: Transaction = {
              txId: data.txId,
              txHash: update.txHash || undefined,
              from: ethers.getAddress(safeAddress),
              to: ethers.getAddress(recipient),
              amount: transferAmount,
              timestamp: Date.now(),
              status: 'verified',
              direction: 'outgoing',
              duration: update.duration,
              sessionKeyAddress: sessionKey.sessionKeyAddress,
            }

            setPendingTransactions(prev => [newTransaction, ...prev])

            // Stop the loading state after verification
            setIsSending(false)

            // Start showing refetch loader
            setIsRefetchingAfterConfirmation(true)
          } else if (update.status === 'confirmed') {
            // toast({
            //   title: '✅ Settled!',
            //   description: `Settled onchain in ${update.duration?.toFixed(2)}s.\nTx hash: ${update.txHash?.slice(0, 10) || 'N/A'}...`,
            //   status: 'info',
            //   duration: 5000,
            //   // containerStyle: {
            //   //   bg: 'green.500',
            //   // },
            // })

            // Update the pending transaction to 'confirmed' status
            setPendingTransactions(prev =>
              prev.map(tx =>
                tx.txId === data.txId
                  ? {
                      ...tx,
                      status: 'confirmed',
                      txHash: update.txHash || tx.txHash,
                      duration: update.duration,
                    }
                  : tx
              )
            )

            // Clear form and reload balance and transactions (wait for Blockscout indexing)
            setRecipient('0x502fb0dFf6A2adbF43468C9888D1A26943eAC6D1')
            setAmount('1')
            setPaymentRequestDetected(false)
            setTimeout(() => {
              loadBalance()
              refetchTransactions().then(() => {
                // Stop showing refetch loader after refetch completes
                setIsRefetchingAfterConfirmation(false)
                // Remove the transaction from pending once it's on blockchain
                setPendingTransactions(prev => prev.filter(tx => tx.txId !== data.txId))
              })
            }, 5000) // Wait 5 seconds for Blockscout to index

            // Close WebSocket
            ws.close()
          }
        }

        ws.onerror = error => {
          console.error('WebSocket error:', error)
          toaster.create({
            title: t.tx.connectionError,
            description: t.tx.lostConnection,
            type: 'warning',
            duration: 5000,
          })
          setIsSending(false)
        }

        ws.onclose = () => {
          console.log('WebSocket closed')
        }
      } else if (data.success && data.txHash) {
        // Synchronous mode - transaction already completed
        console.log('Transaction completed synchronously (no WebSocket)')

        // Show completion toasts
        if (data.durations?.verified) {
          toaster.create({
            title: t.tx.sent,
            description: t.tx.verifiedIn.replace('{duration}', data.durations.verified.toFixed(2)),
            type: 'success',
            duration: 4000,
          })
        }

        setIsSending(false)

        if (data.durations?.confirmed && data.txHash) {
          // toast({
          //   title: '✅ Settled!',
          //   description: `Settled onchain in ${data.durations.confirmed.toFixed(2)}s. \nTx hash: ${data.txHash?.slice(0, 10) || 'N/A'}...`,
          //   status: 'info',
          //   duration: 5000,
          //   // containerStyle: {
          //   //   bg: 'green.500',
          //   // },
          // })
        }

        // Clear form and reload balance and transactions
        setRecipient('0x502fb0dFf6A2adbF43468C9888D1A26943eAC6D1')
        setAmount('1')
        setTimeout(() => {
          loadBalance()
          refetchTransactions()
        }, 5000) // Wait 5 seconds for Blockscout to index
      } else {
        throw new Error(data.error || 'Transaction failed')
      }
    } catch (error: any) {
      toaster.create({
        title: t.tx.transactionFailed,
        description: error.message,
        type: 'error',
        duration: 8000,
      })
      setIsSending(false)
      setPaymentRequestDetected(false)
      setRecipient('0x502fb0dFf6A2adbF43468C9888D1A26943eAC6D1')
      setAmount('1')
    }
  }

  const handleRequestPayment = () => {
    if (!safeAddress || !requestAmount) return

    try {
      const amountInWei = ethers.parseEther(requestAmount).toString()
      const paymentUrl = generatePaymentRequestUrl(safeAddress, amountInWei, EURO_TOKEN_ADDRESS)

      setQrData(paymentUrl)
      setIsQRGenerated(true)
    } catch (error) {
      console.error('Error generating QR data:', error)
      toaster.create({
        title: t.tx.error,
        description: t.tx.failedToGenerateQR,
        type: 'error',
        duration: 3000,
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toaster.create({
      title: t.tx.copied,
      description: t.tx.addressCopied,
      type: 'success',
      duration: 2000,
    })
  }

  if (!isAuthenticated) {
    return (
      <Container maxW="container.md" py={20}>
        <Box textAlign="center">
          <Heading mb={4}>{t.common.pleaseLogin}</Heading>
        </Box>
      </Container>
    )
  }

  if (!safeAddress) {
    return (
      <Container maxW="container.md" py={20}>
        <Box textAlign="center">
          <Heading mb={4}>{t.tx.noSafeWallet}</Heading>
          <Text color="gray.400" mb={6}>
            {t.tx.deploySafeFirst}
          </Text>
          <Button
            asChild
            bg={brandColors.accent}
            color="white"
            _hover={{ bg: brandColors.accent, opacity: 0.8 }}
          >
            <a href="/safe">{t.tx.goToSafeDashboard}</a>
          </Button>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxW="container.md" py={20}>
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            {t.tx.pageTitle}
          </Heading>
          <Text color="gray.400">{t.tx.pageSubtitle}</Text>
        </Box>

        {/* Send Block */}
        <Box bg="gray.900" p={6} borderRadius="lg" border="1px solid" borderColor="gray.700">
          <HStack justify="space-between" mb={4}>
            <Heading size="md">{t.tx.sendEUR}</Heading>
            <HStack>
              <Text fontSize="sm" color="gray.400">
                {t.tx.balance}
              </Text>
              {isLoadingBalance ? (
                <HStack gap={1}>
                  <Text fontFamily="mono" fontWeight="bold">
                    {parseFloat(ethers.formatEther(safeBalance)).toFixed(2)}
                  </Text>
                  <IconButton aria-label={t.tx.refreshBalance} size="xs" variant="ghost">
                    <FiRefreshCw />
                  </IconButton>
                </HStack>
              ) : (
                <HStack gap={1}>
                  <Text fontFamily="mono" fontWeight="bold">
                    {parseFloat(ethers.formatEther(safeBalance)).toFixed(2)}
                  </Text>
                  <IconButton
                    aria-label={t.tx.refreshBalance}
                    size="xs"
                    variant="ghost"
                    onClick={loadBalance}
                  >
                    <FiRefreshCw />
                  </IconButton>
                </HStack>
              )}
            </HStack>
          </HStack>
          <VStack gap={4} align="stretch">
            {/* Session Key Status */}
            {sessionKey ? (
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" color="gray.400">
                    {t.tx.sessionKey}
                  </Text>
                  <Badge colorPalette={isSessionKeyExpired ? 'red' : 'green'}>
                    {isSessionKeyExpired ? t.tx.expired : t.tx.active}
                  </Badge>
                </HStack>
                <Text fontSize="sm" color="gray.400">
                  {t.tx.expires} {new Date(sessionKey.expiresAt).toLocaleString()}
                </Text>
                {isSessionKeyExpired && (
                  <Alert.Root status="error" mt={3} borderRadius="md">
                    <Alert.Indicator />
                    <Box>
                      <Alert.Title>{t.tx.sessionKeyExpired}</Alert.Title>
                      <Alert.Description fontSize="sm">
                        {t.tx.goToSafeToCreateKey}
                      </Alert.Description>
                    </Box>
                  </Alert.Root>
                )}
              </Box>
            ) : (
              <Alert.Root status="warning" borderRadius="md">
                <Alert.Indicator />
                <Box>
                  <Alert.Title>{t.tx.noSessionKey}</Alert.Title>
                  <Alert.Description fontSize="sm">{t.tx.createSessionKeyOnSafe}</Alert.Description>
                </Box>
              </Alert.Root>
            )}

            {/* Send Form */}
            <Field label={t.tx.recipientAddress}>
              <Input
                placeholder={t.tx.recipientPlaceholder}
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                fontFamily="mono"
                disabled={!sessionKey || isSessionKeyExpired || isSending || isCooldown}
              />
            </Field>

            <Field label={t.tx.amountEUR}>
              <NumberInput.Root
                value={amount}
                onValueChange={e => setAmount(e.value)}
                min={0}
                step={0.001}
                disabled={!sessionKey || isSessionKeyExpired || isSending || isCooldown}
              >
                <NumberInput.Field
                  type="text"
                  placeholder={t.tx.amountPlaceholder}
                  fontFamily="mono"
                  onWheel={(e: any) => e.currentTarget.blur()}
                />
                <NumberInput.Control>
                  <NumberInput.IncrementTrigger />
                  <NumberInput.DecrementTrigger />
                </NumberInput.Control>
              </NumberInput.Root>
              {paymentRequestDetected && (
                <Text mt={3} fontSize="md" color="red">
                  {t.tx.incomingPaymentRequest}
                </Text>
              )}
            </Field>

            <Button
              bg={brandColors.accent}
              color="white"
              _hover={{ bg: brandColors.accent, opacity: 0.8 }}
              size="lg"
              onClick={sendTransaction}
              loading={isSending}
              disabled={!recipient || !amount || !sessionKey || isSessionKeyExpired || isCooldown}
            >
              <FiSend />
              {t.tx.send}
            </Button>

            {insufficientBalance && (
              <Text fontSize="2xs" color="red">
                {t.tx.insufficientBalance}
              </Text>
            )}
          </VStack>
        </Box>

        {/* Receive Block */}
        <Box bg="gray.900" p={6} borderRadius="lg" border="1px solid" borderColor="gray.700">
          <Heading size="md" mb={4}>
            {t.tx.receiveEUR}
          </Heading>
          <VStack gap={4} align="stretch">
            <Text color="gray.400" fontSize="sm">
              {t.tx.sendToSafeAddress}
            </Text>

            {/* QR Code */}
            <Box bg="white" p={4} borderRadius="md" alignSelf="center">
              <QRCodeSVG value={safeAddress || ''} size={200} level="H" />
            </Box>

            {/* Address */}
            <Box>
              <Text fontSize="sm" color="gray.400" mb={2}>
                {t.tx.safeAddress}
              </Text>
              <HStack>
                <Input
                  value={safeAddress || ''}
                  readOnly
                  fontFamily="mono"
                  fontSize="sm"
                  bg="gray.900"
                />
                <IconButton
                  aria-label={t.tx.copyAddress}
                  onClick={() => copyToClipboard(safeAddress || '')}
                  colorScheme="purple"
                  variant="outline"
                >
                  <FiCopy />
                </IconButton>
              </HStack>
            </Box>

            <Text fontSize="sm" color="gray.500" textAlign="center">
              {t.tx.scanQROrCopy}
            </Text>

            {!paymentRequestDetected && (
              <Button
                bg="blue.600"
                color="white"
                _hover={{ bg: 'blue.500' }}
                size="md"
                onClick={onRequestModalOpen}
                disabled={!sessionKey || isSessionKeyExpired || isSending || isCooldown}
                width="full"
              >
                {t.tx.requestPayment}
              </Button>
            )}
          </VStack>
        </Box>

        {/* Transaction History */}
        <TransactionHistory
          transactions={[...pendingTransactions, ...transactions]}
          isLoading={isLoadingTransactions}
          isError={isTransactionError}
          error={transactionError}
          onRefresh={refetchTransactions}
          safeAddress={safeAddress}
          lastUpdated={transactionsLastUpdated}
          isRefetchingAfterConfirmation={isRefetchingAfterConfirmation}
        />

        {/* Quick Link */}
        <Box textAlign="center">
          <Button asChild variant="plain" size="sm" color="gray.500">
            <a href="/safe">{t.tx.goToSafeDashboard} →</a>
          </Button>
        </Box>
      </VStack>

      <Dialog.Root
        open={isRequestModalOpen}
        onOpenChange={e => !e.open && handleRequestModalClose()}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content p={6}>
              <Dialog.Header>
                <Dialog.Title>{t.tx.requestPaymentTitle}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pt={4}>
                {!isQRGenerated ? (
                  <>
                    <Field label={t.tx.amountToRequest} required>
                      <NumberInput.Root
                        value={requestAmount}
                        onValueChange={e => setRequestAmount(e.value)}
                        min={0}
                        step={0.001}
                      >
                        <NumberInput.Field
                          type="text"
                          placeholder="0.00"
                          fontFamily="mono"
                          onWheel={(e: any) => e.currentTarget.blur()}
                        />
                        <NumberInput.Control>
                          <NumberInput.IncrementTrigger />
                          <NumberInput.DecrementTrigger />
                        </NumberInput.Control>
                      </NumberInput.Root>
                    </Field>
                  </>
                ) : (
                  <VStack gap={4} align="center">
                    <Text textAlign="center" fontSize={{ base: 'sm', md: 'md' }}>
                      {t.tx.scanQRToSendPayment}
                    </Text>
                    {qrData ? (
                      <Box p={{ base: 2, md: 4 }} bg="white" borderRadius="md">
                        <QRCodeSVG value={qrData} size={qrSize} />
                      </Box>
                    ) : (
                      <Text>{t.tx.loadingQR}</Text>
                    )}
                    <Text
                      textAlign="center"
                      fontSize={{ base: 'xs', md: 'sm' }}
                      color="gray.400"
                      wordBreak="break-all"
                      maxW="full"
                    >
                      {qrData}
                    </Text>
                  </VStack>
                )}
              </Dialog.Body>

              <Dialog.Footer>
                {!isQRGenerated ? (
                  <VStack gap={3} width="full" pt={6}>
                    <HStack gap={2} width="full" flexWrap="wrap">
                      <Button
                        bg={brandColors.accent}
                        color="white"
                        _hover={{ bg: brandColors.accent, opacity: 0.8 }}
                        onClick={handleRequestPayment}
                        disabled={!requestAmount || parseFloat(requestAmount) <= 0}
                        flex="1"
                      >
                        <FaQrcode />
                        {t.tx.generateQR}
                      </Button>

                      {isWebNFCSupported ? (
                        <Button
                          bg="green.600"
                          color="white"
                          _hover={{ bg: 'green.500' }}
                          onClick={() => {
                            if (!safeAddress || !requestAmount) return
                            try {
                              const amountInWei = ethers.parseEther(requestAmount).toString()
                              const paymentUrl = generatePaymentRequestUrl(
                                safeAddress,
                                amountInWei,
                                EURO_TOKEN_ADDRESS
                              )
                              writeNFC(paymentUrl)
                            } catch (err) {
                              toaster.create({
                                title: t.tx.invalidAmount,
                                description: t.tx.invalidAmountDesc,
                                type: 'error',
                                duration: 3000,
                              })
                            }
                          }}
                          disabled={!requestAmount || parseFloat(requestAmount) <= 0}
                          flex="1"
                        >
                          <FaSatellite />
                          {t.tx.writeToNFC}
                        </Button>
                      ) : (
                        <Tooltip content={t.tx.nfcTooltip} showArrow={true}>
                          <span style={{ flex: 1 }}>
                            <Button disabled bg="gray.600" width="full">
                              {t.tx.nfcNotAvailable}
                            </Button>
                          </span>
                        </Tooltip>
                      )}
                    </HStack>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline" width="full">
                        {t.tx.cancel}
                      </Button>
                    </Dialog.ActionTrigger>
                  </VStack>
                ) : (
                  <VStack gap={3} width="full" pt={6}>
                    <Button colorPalette="blue" onClick={handleRequestModalClose} width="full">
                      {t.tx.close}
                    </Button>
                  </VStack>
                )}
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Container>
  )
}
