'use client'

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

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

  // Calculate completed steps based on current step
  const completedSteps: string[] = []
  const stepOrder: OnboardingStep[] = [
    'deploying-safe',
    'safe-deployed',
    'enabling-module',
    'module-enabled',
    'creating-session-key',
    'session-key-created',
    'complete',
  ]

  const completedStepKeys: OnboardingStep[] = [
    'safe-deployed',
    'module-enabled',
    'session-key-created',
  ]

  const currentIndex = stepOrder.indexOf(currentStep)
  for (const stepKey of completedStepKeys) {
    const stepIndex = stepOrder.indexOf(stepKey)
    if (stepIndex <= currentIndex) {
      completedSteps.push(stepInfo[stepKey].label)
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
            {/* Custom Progress Bar */}
            <Box w="100%" h="8px" bg="gray.700" borderRadius="full" overflow="hidden" mb={6}>
              <Box
                h="100%"
                w={`${progress}%`}
                bg="green.500"
                borderRadius="full"
                transition="width 0.3s ease-in-out"
              />
            </Box>

            <Text fontSize="lg" color="gray.300" mb={8} fontWeight="medium">
              {label}
            </Text>

            {completedSteps.length > 0 && (
              <VStack align="stretch" gap={2} maxW="400px" mx="auto">
                {completedSteps.map((step, index) => (
                  <Box
                    key={index}
                    bg="green.900"
                    border="1px solid"
                    borderColor="green.700"
                    borderRadius="md"
                    p={3}
                    textAlign="left"
                  >
                    <Text color="green.200" fontSize="sm">
                      ✓ {step}
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
