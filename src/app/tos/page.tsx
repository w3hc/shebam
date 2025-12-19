'use client'

import { Container, VStack, Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react'
import { brandColors } from '@/theme'

export default function TermsOfServicePage() {
  return (
    <Container maxW="container.lg" py={{ base: 20, md: 24 }}>
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="bold"
            mb={4}
            bgGradient="to-r"
            gradientFrom={brandColors.primary}
            gradientTo={brandColors.accent}
            bgClip="text"
          >
            Terms of Service
          </Heading>
          <Text color="gray.400" fontSize="sm">
            Last updated: December 14, 2024
          </Text>
        </Box>

        {/* Introduction */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            1. Introduction
          </Heading>
          <Text color="gray.300" mb={4}>
            Welcome to Shebam. These Terms of Service (&quot;Terms&quot;) govern your use of the
            Shebam application (&quot;Application&quot;, &quot;Service&quot;, or
            &quot;Platform&quot;), currently operating in Phase 1 on the Gnosis Chain testnet.
          </Text>
          <Text color="gray.300">
            By accessing or using Shebam, you agree to be bound by these Terms. If you do not agree
            to these Terms, please do not use the Service.
          </Text>
        </Box>

        {/* Non-Custodial Nature */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            2. Non-Custodial Wallet Service
          </Heading>
          <Heading size="md" mb={3} mt={6}>
            2.1 User Responsibility
          </Heading>
          <Text color="gray.300" mb={4}>
            Shebam is a <strong>non-custodial</strong> wallet interface. This means:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">
              • <strong>You control your private keys:</strong> Your wallet is secured by a passkey
              (biometric authentication) stored exclusively on your device using WebAuthn
              technology.
            </Text>
            <Text color="gray.300">
              • <strong>Shebam cannot access your funds:</strong> We do not have access to your
              private keys, seed phrases, or the ability to sign transactions on your behalf.
            </Text>
            <Text color="gray.300">
              • <strong>You are solely responsible:</strong> You are entirely responsible for
              maintaining the security of your device, passkey, and backup recovery files.
            </Text>
            <Text color="gray.300">
              • <strong>Loss of access:</strong> If you lose access to your passkey or recovery
              backup, Shebam cannot recover your wallet or funds. There is no password reset
              function.
            </Text>
          </VStack>

          <Heading size="md" mb={3} mt={6}>
            2.2 Safe Wallet Technology
          </Heading>
          <Text color="gray.300" mb={4}>
            Your Shebam account is powered by a{' '}
            <ChakraLink
              href="https://safe.global"
              color={brandColors.accent}
              target="_blank"
              rel="noopener noreferrer"
            >
              Safe smart contract wallet
            </ChakraLink>{' '}
            deployed on the Gnosis Chain. The Safe smart contract is owned exclusively by you
            through your passkey-derived address. Shebam provides only the user interface to
            interact with your Safe wallet.
          </Text>

          <Heading size="md" mb={3} mt={6}>
            2.3 Relayer Service
          </Heading>
          <Text color="gray.300" mb={4}>
            Shebam operates a &quot;relayer&quot; service that pays blockchain gas fees on your
            behalf to enable gasless transactions. The relayer:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">
              • Only executes transactions that you have already signed with your passkey
            </Text>
            <Text color="gray.300">
              • Cannot sign transactions on your behalf or access your funds
            </Text>
            <Text color="gray.300">
              • Pays only network gas fees, not the token amounts you send
            </Text>
            <Text color="gray.300">• Acts purely as a technical facilitator</Text>
          </VStack>
        </Box>

        {/* EURe Token and Monerium */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            3. EURe Token and Monerium Integration
          </Heading>

          <Heading size="md" mb={3} mt={6}>
            3.1 About EURe
          </Heading>
          <Text color="gray.300" mb={4}>
            Shebam facilitates the transfer of EURe tokens, a euro-backed stablecoin issued by{' '}
            <ChakraLink
              href="https://monerium.com"
              color={brandColors.accent}
              target="_blank"
              rel="noopener noreferrer"
            >
              Monerium
            </ChakraLink>
            , an Electronic Money Institution (EMI) regulated by the Central Bank of Iceland.
          </Text>

          <Heading size="md" mb={3} mt={6}>
            3.2 Obtaining EURe Tokens
          </Heading>
          <Text color="gray.300" mb={4}>
            To obtain EURe tokens, you must:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">
              1. Create an account directly with{' '}
              <ChakraLink
                href="https://monerium.app"
                color={brandColors.accent}
                target="_blank"
                rel="noopener noreferrer"
              >
                Monerium
              </ChakraLink>
            </Text>
            <Text color="gray.300">
              2. Complete Monerium&apos;s Know Your Customer (KYC) and Anti-Money Laundering (AML)
              verification process
            </Text>
            <Text color="gray.300">3. Transfer EUR to Monerium via SEPA bank transfer</Text>
            <Text color="gray.300">
              4. Monerium will mint EURe tokens to your Shebam wallet address
            </Text>
          </VStack>

          <Heading size="md" mb={3} mt={6}>
            3.3 KYC/AML Compliance
          </Heading>
          <Text color="gray.300" mb={4}>
            <strong>Important:</strong> Shebam does NOT perform KYC/AML verification. All identity
            verification, compliance checks, and fiat currency handling are managed exclusively by
            Monerium. By using EURe tokens through Shebam, you acknowledge that:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">
              • You must comply with Monerium&apos;s terms of service and verification requirements
            </Text>
            <Text color="gray.300">
              • Shebam has no role in the KYC/AML process or fiat-to-crypto conversion
            </Text>
            <Text color="gray.300">
              • Shebam does not receive, hold, or transmit fiat currency (EUR)
            </Text>
            <Text color="gray.300">
              • Any disputes regarding KYC, AML, or fiat transactions must be resolved with Monerium
            </Text>
          </VStack>

          <Heading size="md" mb={3} mt={6}>
            3.4 Alternative Methods to Obtain EURe
          </Heading>
          <Text color="gray.300" mb={4}>
            You may also obtain EURe tokens by:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">• Receiving a payment from another Shebam user</Text>
            <Text color="gray.300">
              • Purchasing EURe on cryptocurrency exchanges (e.g., Kraken) and transferring to your
              wallet
            </Text>
            <Text color="gray.300">
              • Any other legitimate means of acquiring EURe on the Gnosis Chain
            </Text>
          </VStack>
          <Text color="gray.500" fontSize="sm">
            Note: These alternative methods may still require you to have completed KYC with the
            respective service providers.
          </Text>
        </Box>

        {/* User Responsibilities */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            4. User Responsibilities and Prohibited Activities
          </Heading>

          <Heading size="md" mb={3} mt={6}>
            4.1 Your Responsibilities
          </Heading>
          <Text color="gray.300" mb={4}>
            As a user of Shebam, you are responsible for:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">• All transactions you initiate through your wallet</Text>
            <Text color="gray.300">• Verifying recipient addresses before sending payments</Text>
            <Text color="gray.300">• Maintaining the security of your device and passkey</Text>
            <Text color="gray.300">
              • Creating and securing backup recovery files as recommended
            </Text>
            <Text color="gray.300">
              • Complying with all applicable laws and regulations in your jurisdiction
            </Text>
            <Text color="gray.300">
              • Understanding that blockchain transactions are irreversible
            </Text>
          </VStack>

          <Heading size="md" mb={3} mt={6}>
            4.2 Prohibited Activities
          </Heading>
          <Text color="gray.300" mb={4}>
            You agree NOT to use Shebam for any unlawful or prohibited purposes, including but not
            limited to:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">• Money laundering or terrorist financing</Text>
            <Text color="gray.300">• Fraud, scams, or any deceptive practices</Text>
            <Text color="gray.300">• Violating sanctions or export control laws</Text>
            <Text color="gray.300">• Purchasing illegal goods or services</Text>
            <Text color="gray.300">• Attempting to hack, exploit, or compromise the Service</Text>
            <Text color="gray.300">• Interfering with other users&apos; access to the Service</Text>
          </VStack>
        </Box>

        {/* Disclaimers and Limitations */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            5. Disclaimers and Limitations of Liability
          </Heading>

          <Heading size="md" mb={3} mt={6}>
            5.1 &quot;As Is&quot; Service
          </Heading>
          <Text color="gray.300" mb={4}>
            Shebam is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of
            any kind, either express or implied. We do not guarantee that the Service will be:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">• Uninterrupted or error-free</Text>
            <Text color="gray.300">• Free from viruses or harmful components</Text>
            <Text color="gray.300">• Accurate or reliable</Text>
            <Text color="gray.300">• Available at all times</Text>
          </VStack>

          <Heading size="md" mb={3} mt={6}>
            5.2 No Liability for Losses
          </Heading>
          <Text color="gray.300" mb={4}>
            To the maximum extent permitted by law, Shebam and its operators shall NOT be liable for
            any:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">
              • Loss of funds due to user error, forgotten passwords, or lost private keys
            </Text>
            <Text color="gray.300">
              • Losses resulting from unauthorized access to your device or account
            </Text>
            <Text color="gray.300">• Fluctuations in cryptocurrency or token values</Text>
            <Text color="gray.300">
              • Network fees, gas costs, or transaction failures on the blockchain
            </Text>
            <Text color="gray.300">
              • Actions or inactions of third parties, including Monerium, blockchain networks, or
              token issuers
            </Text>
            <Text color="gray.300">• Errors in smart contract code or blockchain protocols</Text>
            <Text color="gray.300">• Any consequential, indirect, or incidental damages</Text>
          </VStack>

          <Heading size="md" mb={3} mt={6}>
            5.3 Blockchain Risks
          </Heading>
          <Text color="gray.300" mb={4}>
            You acknowledge and accept the inherent risks of blockchain technology, including:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">
              • Transactions are irreversible and cannot be canceled once confirmed
            </Text>
            <Text color="gray.300">
              • Blockchain networks may experience congestion, delays, or failures
            </Text>
            <Text color="gray.300">• Smart contracts may contain bugs or vulnerabilities</Text>
            <Text color="gray.300">
              • Regulatory frameworks for blockchain technology are evolving and uncertain
            </Text>
          </VStack>

          <Heading size="md" mb={3} mt={6}>
            5.4 Third-Party Services
          </Heading>
          <Text color="gray.300" mb={4}>
            Shebam integrates with third-party services (including Monerium, Safe, and the Gnosis
            Chain). We are not responsible for:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">
              • The availability, functionality, or security of these services
            </Text>
            <Text color="gray.300">• Changes to third-party terms of service or policies</Text>
            <Text color="gray.300">
              • Actions taken by third parties, including freezing accounts or blocking transactions
            </Text>
          </VStack>
        </Box>

        {/* Testnet Phase */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="2px solid"
          borderColor={brandColors.primary}
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            6. Current Phase: Testnet (Phase 0)
          </Heading>
          <Text color="gray.300" mb={4}>
            <strong>IMPORTANT:</strong> Shebam is currently operating on the{' '}
            <strong>Gnosis Chiado testnet</strong>. This means:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">
              • The tokens used are <strong>test tokens with no real monetary value</strong>
            </Text>
            <Text color="gray.300">
              • This is a technical demonstration and testing environment only
            </Text>
            <Text color="gray.300">• No real fiat currency (EUR) is involved in this phase</Text>
            <Text color="gray.300">
              • KYC/AML requirements do not apply during the testnet phase
            </Text>
            <Text color="gray.300">
              • The Service may be reset, modified, or discontinued without notice
            </Text>
          </VStack>
          <Text color="gray.300" mt={4}>
            When Shebam transitions to mainnet (Phase 1), these Terms will be updated accordingly,
            and users will be required to comply with KYC/AML requirements through Monerium.
          </Text>
        </Box>

        {/* Data and Privacy */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            7. Privacy and Data
          </Heading>

          <Heading size="md" mb={3} mt={6}>
            7.1 Data We Collect
          </Heading>
          <Text color="gray.300" mb={4}>
            Shebam collects minimal data:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">• Your chosen username (stored locally on your device)</Text>
            <Text color="gray.300">• Your wallet address (publicly visible on the blockchain)</Text>
            <Text color="gray.300">• Connection logs (IP address, timestamps)</Text>
            <Text color="gray.300">• Technical data necessary to operate the relayer service</Text>
          </VStack>

          <Heading size="md" mb={3} mt={6}>
            7.2 Data We Do NOT Collect
          </Heading>
          <Text color="gray.300" mb={4}>
            Shebam does NOT collect or have access to:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">• Your private keys or seed phrases</Text>
            <Text color="gray.300">• Your biometric data (stored only on your device)</Text>
            <Text color="gray.300">
              • Personal identification information (managed by Monerium)
            </Text>
            <Text color="gray.300">
              • Complete transaction history (visible publicly on blockchain)
            </Text>
          </VStack>

          <Heading size="md" mb={3} mt={6}>
            7.3 Blockchain Transparency
          </Heading>
          <Text color="gray.300" mb={4}>
            All transactions are recorded on the public Gnosis Chain blockchain. This means:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">
              • Your wallet address and transaction history are publicly visible
            </Text>
            <Text color="gray.300">
              • Anyone can view your balance and transactions using a blockchain explorer
            </Text>
            <Text color="gray.300">• Blockchain data is permanent and cannot be deleted</Text>
          </VStack>
        </Box>

        {/* Intellectual Property */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            8. Intellectual Property
          </Heading>
          <Text color="gray.300" mb={4}>
            The Shebam application, including its design, logo, and user interface, is the property
            of its creators. The underlying technologies used (Safe, w3pk, Gnosis Chain) are
            governed by their respective open-source licenses.
          </Text>
          <Text color="gray.300">
            You may not copy, modify, distribute, or reverse-engineer the Shebam application without
            permission.
          </Text>
        </Box>

        {/* Modifications */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            9. Modifications to Terms
          </Heading>
          <Text color="gray.300" mb={4}>
            We reserve the right to modify these Terms at any time. When we make changes:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">
              • The &quot;Last updated&quot; date at the top of this page will be revised
            </Text>
            <Text color="gray.300">
              • Significant changes will be communicated through the application
            </Text>
            <Text color="gray.300">
              • Your continued use of Shebam after changes constitutes acceptance of the new Terms
            </Text>
          </VStack>
        </Box>

        {/* Termination */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            10. Service Termination
          </Heading>
          <Text color="gray.300" mb={4}>
            We reserve the right to suspend or terminate access to the Service at any time, with or
            without notice, for any reason, including:
          </Text>
          <VStack align="start" gap={3} pl={4} mb={4}>
            <Text color="gray.300">• Violation of these Terms</Text>
            <Text color="gray.300">• Suspected illegal or fraudulent activity</Text>
            <Text color="gray.300">• Technical or security reasons</Text>
            <Text color="gray.300">• Discontinuation of the Service</Text>
          </VStack>
          <Text color="gray.300" mt={4}>
            <strong>Important:</strong> Because Shebam is non-custodial, termination of the Service
            does not affect your ability to access your wallet using other interfaces or directly
            through the blockchain. Your funds remain under your control via your private keys.
          </Text>
        </Box>

        {/* Governing Law */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            11. Governing Law and Disputes
          </Heading>
          <Text color="gray.300" mb={4}>
            These Terms shall be governed by and construed in accordance with the laws of France,
            without regard to its conflict of law provisions.
          </Text>
          <Text color="gray.300">
            Any disputes arising from these Terms or your use of Shebam shall be resolved in the
            courts of Paris, France.
          </Text>
        </Box>

        {/* Contact */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="lg" mb={4} color={brandColors.accent}>
            12. Contact Information
          </Heading>
          <Text color="gray.300" mb={4}>
            If you have questions about these Terms of Service, please contact us at:
          </Text>
          <Text color="gray.300" fontFamily="mono">
            Email:{' '}
            <ChakraLink href="mailto:julien@strat.cc" color={brandColors.accent}>
              julien@strat.cc
            </ChakraLink>
          </Text>
        </Box>

        {/* Acknowledgment */}
        <Box
          bg="gray.900"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          border="2px solid"
          borderColor={brandColors.accent}
          textAlign="center"
        >
          <Heading size="md" mb={4} color={brandColors.accent}>
            Acknowledgment
          </Heading>
          <Text color="gray.300" fontSize="lg">
            BY USING SHEBAM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND
            BY THESE TERMS OF SERVICE.
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}
