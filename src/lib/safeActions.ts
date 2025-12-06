import { ethers } from 'ethers'

export interface SessionKey {
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

export interface SafeDeploymentResult {
  success: boolean
  safeAddress: string
  safeOwner: string
  txHash?: string
  deploymentBlockNumber?: number
  error?: string
}

export interface SessionKeyCreationResult {
  success: boolean
  sessionKey?: SessionKey
  requiresModuleEnable?: boolean
  enableModuleTxData?: {
    to: string
    data: string
    value: string
  }
  error?: string
}

type SigningMethod = 'EIP191' | 'rawHash'
type SecurityMode = 'STANDARD' | 'STRICT' | 'YOLO'

interface SignMessageOptions {
  mode?: SecurityMode
  tag?: string
  requireAuth?: boolean
  signingMethod?: SigningMethod
}

export interface SafeActionsConfig {
  deriveWallet: (mode: string, tag: string) => Promise<{ address: string; privateKey?: string }>
  signMessage: (message: string, options?: SignMessageOptions) => Promise<string | null>
  chainId: number
  userId?: string
}

/**
 * Deploy a Safe wallet for the user
 */
export async function deploySafe(
  config: SafeActionsConfig
): Promise<SafeDeploymentResult> {
  try {
    const ownerWallet = await config.deriveWallet('STANDARD', 'OWNER')

    const deployResponse = await fetch('/api/safe/deploy-safe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userAddress: ownerWallet.address,
        chainId: config.chainId,
      }),
    })

    const deployData = await deployResponse.json()

    if (!deployData.success) {
      return {
        success: false,
        safeAddress: '',
        safeOwner: '',
        error: deployData.error || 'Failed to deploy Safe',
      }
    }

    const result: SafeDeploymentResult = {
      success: true,
      safeAddress: deployData.safeAddress,
      safeOwner: ownerWallet.address,
      txHash: deployData.txHash,
      deploymentBlockNumber: deployData.deploymentBlockNumber,
    }

    // Save to localStorage if userId is provided
    if (config.userId) {
      localStorage.setItem(
        `safe_${config.userId}`,
        JSON.stringify({
          safeAddress: result.safeAddress,
          safeOwner: result.safeOwner,
        })
      )
    }

    return result
  } catch (error: any) {
    return {
      success: false,
      safeAddress: '',
      safeOwner: '',
      error: error.message || 'Failed to deploy Safe',
    }
  }
}

/**
 * Create a session key for a Safe wallet
 */
export async function createSessionKey(
  config: SafeActionsConfig,
  safeAddress: string
): Promise<SessionKeyCreationResult> {
  try {
    const ownerWallet = await config.deriveWallet('STANDARD', 'OWNER')
    const userWallet = await config.deriveWallet('STANDARD', 'USER')

    const sessionResponse = await fetch('/api/safe/create-session-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userAddress: ownerWallet.address,
        safeAddress: safeAddress,
        chainId: config.chainId,
        sessionKeyAddress: userWallet.address,
        sessionKeyIndex: 1,
      }),
    })

    const sessionData = await sessionResponse.json()

    if (sessionData.requiresModuleEnable) {
      return {
        success: false,
        requiresModuleEnable: true,
        enableModuleTxData: sessionData.enableModuleTxData,
      }
    }

    if (!sessionData.success) {
      return {
        success: false,
        error: sessionData.error || 'Failed to create session key',
      }
    }

    return {
      success: true,
      sessionKey: sessionData,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create session key',
    }
  }
}

/**
 * Enable the Smart Sessions module on a Safe wallet
 */
export async function enableModule(
  config: SafeActionsConfig,
  safeAddress: string,
  enableModuleTxData: { to: string; data: string; value: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    const ownerWallet = await config.deriveWallet('STANDARD', 'OWNER')

    // Get the Safe transaction hash to sign
    const hashResponse = await fetch('/api/safe/get-tx-hash', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        safeAddress: safeAddress,
        to: enableModuleTxData.to,
        data: enableModuleTxData.data,
        value: enableModuleTxData.value || '0',
        chainId: config.chainId,
      }),
    })

    const hashData = await hashResponse.json()
    if (!hashData.success) {
      return {
        success: false,
        error: hashData.error || 'Failed to get transaction hash',
      }
    }

    // Sign the Safe transaction hash
    const signature = await config.signMessage(hashData.txHash, {
      mode: 'STANDARD',
      tag: 'OWNER',
      signingMethod: 'rawHash',
    })

    if (!signature) {
      return {
        success: false,
        error: 'Failed to sign transaction - signature is null',
      }
    }

    // Execute the transaction
    const executeResponse = await fetch('/api/safe/execute-tx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        safeAddress: safeAddress,
        to: enableModuleTxData.to,
        data: enableModuleTxData.data,
        value: enableModuleTxData.value || '0',
        ownerAddress: ownerWallet.address,
        signature,
        chainId: config.chainId,
      }),
    })

    const executeResult = await executeResponse.json()

    if (!executeResult.success) {
      return {
        success: false,
        error: executeResult.error || 'Failed to enable module',
      }
    }

    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to enable module',
    }
  }
}

/**
 * Complete setup: Deploy Safe, enable module if needed, and create session key
 */
export async function setupSafeWithSessionKey(
  config: SafeActionsConfig,
  callbacks?: {
    onDeploying?: () => void
    onDeployed?: (result: SafeDeploymentResult) => void
    onEnablingModule?: () => void
    onModuleEnabled?: () => void
    onCreatingSessionKey?: () => void
    onSessionKeyCreated?: (sessionKey: SessionKey) => void
    onError?: (error: string) => void
  }
): Promise<{
  success: boolean
  safeAddress?: string
  safeOwner?: string
  sessionKey?: SessionKey
  error?: string
}> {
  try {
    // Step 1: Deploy Safe
    callbacks?.onDeploying?.()
    const deployResult = await deploySafe(config)

    if (!deployResult.success) {
      callbacks?.onError?.(deployResult.error || 'Failed to deploy Safe')
      return {
        success: false,
        error: deployResult.error,
      }
    }

    callbacks?.onDeployed?.(deployResult)

    // Step 2: Create Session Key (may require enabling module)
    callbacks?.onCreatingSessionKey?.()
    const sessionResult = await createSessionKey(config, deployResult.safeAddress)

    if (sessionResult.requiresModuleEnable && sessionResult.enableModuleTxData) {
      // Enable module
      callbacks?.onEnablingModule?.()
      const enableResult = await enableModule(
        config,
        deployResult.safeAddress,
        sessionResult.enableModuleTxData
      )

      if (!enableResult.success) {
        callbacks?.onError?.(enableResult.error || 'Failed to enable module')
        return {
          success: false,
          safeAddress: deployResult.safeAddress,
          safeOwner: deployResult.safeOwner,
          error: enableResult.error,
        }
      }

      callbacks?.onModuleEnabled?.()

      // Wait a bit for the module to be fully enabled
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Try creating session key again
      callbacks?.onCreatingSessionKey?.()
      const finalSessionResult = await createSessionKey(config, deployResult.safeAddress)

      if (!finalSessionResult.success || !finalSessionResult.sessionKey) {
        callbacks?.onError?.(
          finalSessionResult.error || 'Failed to create session key after enabling module'
        )
        return {
          success: false,
          safeAddress: deployResult.safeAddress,
          safeOwner: deployResult.safeOwner,
          error: finalSessionResult.error,
        }
      }

      // Save session key to localStorage if userId is provided
      if (config.userId) {
        const existingData = localStorage.getItem(`safe_${config.userId}`)
        const existing = existingData ? JSON.parse(existingData) : {}
        localStorage.setItem(
          `safe_${config.userId}`,
          JSON.stringify({
            ...existing,
            safeAddress: deployResult.safeAddress,
            sessionKey: finalSessionResult.sessionKey,
          })
        )
      }

      callbacks?.onSessionKeyCreated?.(finalSessionResult.sessionKey)

      return {
        success: true,
        safeAddress: deployResult.safeAddress,
        safeOwner: deployResult.safeOwner,
        sessionKey: finalSessionResult.sessionKey,
      }
    }

    if (!sessionResult.success || !sessionResult.sessionKey) {
      callbacks?.onError?.(sessionResult.error || 'Failed to create session key')
      return {
        success: false,
        safeAddress: deployResult.safeAddress,
        safeOwner: deployResult.safeOwner,
        error: sessionResult.error,
      }
    }

    // Save session key to localStorage if userId is provided
    if (config.userId) {
      const existingData = localStorage.getItem(`safe_${config.userId}`)
      const existing = existingData ? JSON.parse(existingData) : {}
      localStorage.setItem(
        `safe_${config.userId}`,
        JSON.stringify({
          ...existing,
          safeAddress: deployResult.safeAddress,
          sessionKey: sessionResult.sessionKey,
        })
      )
    }

    callbacks?.onSessionKeyCreated?.(sessionResult.sessionKey)

    return {
      success: true,
      safeAddress: deployResult.safeAddress,
      safeOwner: deployResult.safeOwner,
      sessionKey: sessionResult.sessionKey,
    }
  } catch (error: any) {
    const errorMessage = error.message || 'An error occurred during setup'
    callbacks?.onError?.(errorMessage)
    return {
      success: false,
      error: errorMessage,
    }
  }
}
