import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { createWeb3Passkey } from 'w3pk'
import { EURO_TOKEN_ADDRESS, ERC20_ABI } from '@/lib/constants'

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
      return NextResponse.json({ error: `No RPC endpoints available for chain ID: ${chainId}` }, { status: 400 })
    }

    const rpcUrl = endpoints[0]
    const provider = new ethers.JsonRpcProvider(rpcUrl)

    // Fetch EUR token balance instead of native balance
    const euroContract = new ethers.Contract(EURO_TOKEN_ADDRESS, ERC20_ABI, provider)
    const balance = await euroContract.balanceOf(safeAddress)

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

