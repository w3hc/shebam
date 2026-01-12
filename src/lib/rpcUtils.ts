/**
 * Utility functions for RPC endpoint management
 */

/**
 * Get a random RPC endpoint from the list of available endpoints
 * @param endpoints Array of RPC endpoints
 * @returns A randomly selected RPC endpoint
 */
export function getRandomEndpoint(endpoints: string[]): string {
  if (!endpoints || endpoints.length === 0) {
    throw new Error('No endpoints available')
  }

  // Generate random index between 0 and endpoints.length - 1
  const randomIndex = Math.floor(Math.random() * endpoints.length)
  return endpoints[randomIndex]
}
