'use client'

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { brandColors } from '@/theme'

export type OnboardingStep =
  | 'deploying-safe'
  | 'safe-deployed'
  | 'enabling-module'
  | 'module-enabled'
  | 'creating-session-key'
  | 'session-key-created'
  | 'complete'

interface OnboardingProgressProps {
  currentStep: OnboardingStep
  error?: string
}

const stepInfo: Record<OnboardingStep, { label: string; progress: number }> = {
  'deploying-safe': { label: 'Deploying your onchain Safe...', progress: 20 },
  'safe-deployed': { label: 'Onchain Safe deployed', progress: 40 },
  'enabling-module': { label: 'Enabling session key module...', progress: 50 },
  'module-enabled': { label: 'Session key module enabled', progress: 70 },
  'creating-session-key': { label: 'Creating session key...', progress: 80 },
  'session-key-created': { label: 'Session key created', progress: 95 },
  complete: { label: 'Setup complete!', progress: 100 },
}

export function OnboardingProgress({ currentStep, error }: OnboardingProgressProps) {
  const { label, progress } = stepInfo[currentStep]

  // Calculate completed status messages to accumulate (only show completed, not in-progress)
  const completedMessages: string[] = []
  const stepOrder: OnboardingStep[] = [
    'deploying-safe',
    'safe-deployed',
    'enabling-module',
    'module-enabled',
    'creating-session-key',
    'session-key-created',
    'complete',
  ]

  // Only show completed steps
  const completedStepKeys: OnboardingStep[] = [
    'safe-deployed',
    'module-enabled',
    'session-key-created',
    'complete',
  ]

  const currentIndex = stepOrder.indexOf(currentStep)

  // Build accumulated completed messages
  for (const stepKey of completedStepKeys) {
    const stepIndex = stepOrder.indexOf(stepKey)
    // Only add if this step has been completed (not the current step unless it's complete)
    if (stepIndex < currentIndex || currentStep === 'complete') {
      completedMessages.push(stepInfo[stepKey].label)
    }
  }

  return (
    <Container maxW="container.md" py={20}>
      <Box textAlign="center">
        <Heading as="h1" size="xl" mb={6}>
          Setting up your account
        </Heading>

        {error ? (
          <Box bg="red.900" border="1px solid" borderColor="red.700" borderRadius="md" p={4} mb={6}>
            <Text color="red.200" fontWeight="medium">
              {error}
            </Text>
          </Box>
        ) : (
          <>
            {/* Custom Progress Bar with brand primary color */}
            <Box w="100%" h="10px" bg="gray.700" borderRadius="full" overflow="hidden" mb={4}>
              <Box
                h="100%"
                w={`${progress}%`}
                bg={brandColors.primary}
                borderRadius="full"
                transition="width 0.3s ease-in-out"
              />
            </Box>

            {/* Current action in white under progress bar */}
            <Text color="white" fontSize="md" mb={8} fontWeight="normal">
              {label}
            </Text>

            {/* Accumulated completed messages */}
            {completedMessages.length > 0 && (
              <VStack align="stretch" gap={2} maxW="500px" mx="auto">
                {completedMessages.map((message, index) => (
                  <Box key={index} textAlign="left" transition="all 0.3s ease-in-out">
                    <Text color={brandColors.accent} fontSize="sm" fontWeight="medium">
                      {message}
                    </Text>
                  </Box>
                ))}
              </VStack>
            )}
          </>
        )}
      </Box>
    </Container>
  )
}
