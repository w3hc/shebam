import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { createWeb3Passkey } from 'w3pk'
import { EURO_TOKEN_ADDRESS, ERC20_ABI } from '@/lib/constants'
import { getShuffledEndpoints } from '@/lib/rpcUtils'

/**
 * POST /api/safe/balance
 * Fetch the EUR token balance of a Safe wallet
 * Body: { safeAddress: string, chainId: number }
 */

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

    console.log(`💰 Fetching balance for Safe ${safeAddress} on chain ${chainId}`)

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

    const shuffledEndpoints = getShuffledEndpoints(endpoints)
    let lastError: Error | null = null

    // Try each endpoint until one works
    for (let i = 0; i < shuffledEndpoints.length; i++) {
      const rpcUrl = shuffledEndpoints[i]

      try {
        const provider = new ethers.JsonRpcProvider(rpcUrl)
        const euroContract = new ethers.Contract(EURO_TOKEN_ADDRESS, ERC20_ABI, provider)

        // Add a timeout to the balance call
        const balancePromise = euroContract.balanceOf(safeAddress)
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('RPC timeout')), 5000)
        )

        const balance = (await Promise.race([balancePromise, timeoutPromise])) as bigint

        console.log(`✅ EUR Balance: ${balance.toString()} (${ethers.formatUnits(balance, 18)} EUR)`)

        return NextResponse.json(
          {
            success: true,
            balance: balance.toString(),
            safeAddress,
            chainId,
          },
          { status: 200 }
        )
      } catch (error: any) {
        lastError = error
        console.warn(`⚠️  Endpoint ${i + 1}/${shuffledEndpoints.length} failed: ${rpcUrl}`)
        console.warn(`   Error: ${error.message}`)

        // Continue to next endpoint
        if (i < shuffledEndpoints.length - 1) {
          continue
        }
      }
    }

    // All endpoints failed
    console.error(`❌ All RPC endpoints failed for balance check`)
    console.error(`   Last error: ${lastError?.message}`)
    console.log(`   Returning zero balance`)

    return NextResponse.json(
      {
        success: true,
        balance: '0',
        safeAddress,
        chainId,
        warning: 'Could not fetch balance from any RPC endpoint',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error fetching balance:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch balance',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
