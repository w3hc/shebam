/**
 * Utility functions for RPC endpoint management
 */

/**
 * Get a random RPC endpoint from the list of available endpoints
 * Prioritizes endpoints that don't contain 'drpc.org' (known to be unreliable)
 * @param endpoints Array of RPC endpoints
 * @returns A randomly selected RPC endpoint
 */
export function getRandomEndpoint(endpoints: string[]): string {
  if (!endpoints || endpoints.length === 0) {
    throw new Error('No endpoints available')
  }

  // Filter out drpc.org endpoints (known to be unreliable)
  const reliableEndpoints = endpoints.filter(url => !url.includes('drpc.org'))

  // If we have reliable endpoints, use them; otherwise fall back to all endpoints
  const endpointsToUse = reliableEndpoints.length > 0 ? reliableEndpoints : endpoints

  // Generate random index
  const randomIndex = Math.floor(Math.random() * endpointsToUse.length)
  return endpointsToUse[randomIndex]
}

/**
 * Get all endpoints in a shuffled order for fallback retry logic
 * Prioritizes reliable endpoints (non-drpc.org) first, then drpc.org as fallback
 * @param endpoints Array of RPC endpoints
 * @returns Shuffled array of endpoints with reliable ones first
 */
export function getShuffledEndpoints(endpoints: string[]): string[] {
  if (!endpoints || endpoints.length === 0) {
    throw new Error('No endpoints available')
  }

  // Separate reliable and unreliable endpoints
  const reliableEndpoints = endpoints.filter(url => !url.includes('drpc.org'))
  const unreliableEndpoints = endpoints.filter(url => url.includes('drpc.org'))

  // Shuffle each group separately using Fisher-Yates
  const shuffleArray = (arr: string[]) => {
    const shuffled = [...arr]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Return reliable endpoints first, then unreliable ones
  return [...shuffleArray(reliableEndpoints), ...shuffleArray(unreliableEndpoints)]
}
