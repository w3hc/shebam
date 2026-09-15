---
title: Shebam — Technical Roadmap
description: Engineering workstreams for Shebam, from the current testnet build to mainnet, account abstraction, fiat rails, shielded transfers and merchant tooling, with their dependencies and constraints.
date: 2026-09-15
locale: en_US
author: Julien Béranger
model: Claude Opus 5
---

## 1. Scope

Shebam is a payment application built around a single use case: fast, cheap, everyday transfers of euro-denominated value — buying groceries at a market stall. The product is a **wallet and nothing else**; the reasoning behind that constraint, and the invariants it imposes on every workstream below, are set out in [LEGAL.md](LEGAL.md).

This document describes the engineering work, its dependencies and its constraints. It deliberately states **no dates**: workstreams are ordered by dependency, not by calendar.

- Repository: [w3hc/shebam](https://github.com/w3hc/shebam)
- Live build: [shebam.w3hc.org](https://shebam.w3hc.org/)
- Template: [w3hc/genji](https://github.com/w3hc/genji), currently synced at `v3.1.1`

## 2. Current architecture

### 2.1 Application layer

| Concern         | Technology                                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js](https://nextjs.org/) 16 (App Router) on a custom [Node.js](https://nodejs.org/) server                                                      |
| UI              | [React](https://react.dev/) 19, [Chakra UI](https://chakra-ui.com/) 3, [Framer Motion](https://motion.dev/)                                           |
| Language        | [TypeScript](https://www.typescriptlang.org/) 6, strict                                                                                               |
| Package manager | [pnpm](https://pnpm.io/)                                                                                                                              |
| Quality gates   | [ESLint](https://eslint.org/) with [`eslint-plugin-jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y), [Prettier](https://prettier.io/) |
| Hosting         | Ubuntu VPS at [Infomaniak](https://www.infomaniak.com/)                                                                                               |

### 2.2 Wallet and account layer

- **Key management** — [w3pk](https://www.npmjs.com/package/w3pk) (`^0.10.2`, [source](https://github.com/w3hc/w3pk)), a passkey-based wallet. Authentication uses [WebAuthn](https://www.w3.org/TR/webauthn-2/) [passkeys](https://fidoalliance.org/passkeys/) — face or fingerprint — so there is no seed phrase to display, store or lose. Recovery material is split with [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing) via [`secrets.js`](https://www.npmjs.com/package/secrets.js-34r7h).
- **Smart account** — a [Safe](https://safe.global/) deployed per user through the [Protocol Kit](https://docs.safe.global/sdk/protocol-kit), with the [API Kit](https://docs.safe.global/sdk/api-kit) for transaction service reads. Deployment is **1-of-1: the user is the sole owner**, as required by the first invariant in [LEGAL.md](LEGAL.md).
- **Session keys** — [`@rhinestone/module-sdk`](https://www.npmjs.com/package/@rhinestone/module-sdk) with the Smart Sessions module and the Ownable Validator, following [ERC-7579](https://eips.ethereum.org/EIPS/eip-7579) modular account standards. See the [Rhinestone documentation](https://docs.rhinestone.dev/).
- **Relayer** — the server holds a key used to broadcast and pay gas for transactions the user has already signed on-device. The user's signing material never leaves the device.
- **Chain access** — [ethers.js v6](https://docs.ethers.org/v6/) over a shuffled pool of RPC endpoints (`src/lib/rpcUtils.ts`) for redundancy.

### 2.3 Network and asset

Currently deployed on [Gnosis Chiado](https://docs.gnosischain.com/concepts/networks/chiado), the [Gnosis Chain](https://docs.gnosischain.com/) testnet, against a mock euro ERC-20. The production target is [EURe](https://www.gnosis.io/blog/eure-on-gnosis-chain), the euro e-money token issued by [Monerium](https://monerium.com/) on Gnosis mainnet.

### 2.4 Interfaces

- Wallet dashboard and transfer flow (`src/app/safe`)
- Settings, session management and build verification (`src/app/settings`, `src/components/BuildVerification.tsx`)
- [Web NFC](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API) tap-to-pay surface (`src/app/nfc`)
- [QR codes](https://www.npmjs.com/package/qrcode.react) for address and request exchange
- Terms of service (`src/app/tos`)
- A [Solidity](https://soliditylang.org/) contract package built with [Foundry](https://getfoundry.sh/) and [OpenZeppelin Contracts](https://www.openzeppelin.com/contracts) (`contract/`)

## 3. Workstreams

### W0 — Hardening the wallet invariant

This workstream has priority over every other, because it protects the premise the whole product rests on.

- **Audit the relayer boundary.** Verify, and cover with tests, that the relayer can only broadcast a payload the user has already signed; that it cannot originate, substitute, reorder or censor a transaction; and that it is never an owner of the Safe. The Safe is deployed 1-of-1 with the user as sole owner and must remain so.
- **Audit the session-key boundary.** Session keys must be scoped by target contract, selector and amount, must be user-granted, and must be revocable from the client without server cooperation.
- **Eliminate server-side transaction history.** Transaction history is presently served from a backend store ([`@neondatabase/serverless`](https://neon.com/)). Since Shebam has no retention obligation, history should be reconstructed client-side from chain data, with anything retained server-side reduced to what is strictly operational. This is both a privacy and a perimeter concern — see [LEGAL.md §8](LEGAL.md#8-the-standing-test-for-new-features).
- **Reproducible builds.** Extend the existing build-verification surface so a user can verify that the served bundle matches the published source. This is the technical counterpart to "we are only a wallet": it is checkable rather than merely asserted.
- **Content Security Policy.** Keep the [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) tight; every allowance added for a third-party script is an expansion of the trusted computing base.
- **Terms of service v0.1.0**, with translations, presented for acceptance.

### W1 — Mainnet migration

- Promote [Gnosis Chain](https://docs.gnosischain.com/) mainnet in `src/lib/chains.ts`; retire the mock euro token in favour of the EURe contract address.
- Replace the testnet faucet path with a real funding path; xDAI gas sponsorship moves entirely to the relayer.
- Resilient RPC configuration for mainnet, with fallbacks and health checks.
- Fix Safe deployment status display: deployment state must be legible at every step, including the counterfactual-address period before the first transaction.
- Block explorer wiring against [Gnosisscan](https://gnosisscan.io/).

Moving to production does **not** change the legal nature of the application; it changes only the cost of a defect.

### W2 — Account abstraction and gas

- **[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)** — delegate code to the user's EOA so it behaves as a smart account, removing the relayer overhead and a large part of the Safe deployment friction. This is the preferred direction now that [Pectra](https://ethereum.org/en/roadmap/pectra/) semantics are available.
- Evaluate [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) bundler and paymaster infrastructure on Gnosis as the alternative path, and pick one rather than maintaining both.
- Session-key UX in the dashboard: grant, inspect scope, show remaining validity, revoke.
- Live session duration and fail-safe credential checks (already landed on the current branch) generalised across the app.

### W3 — Fiat rails via Monerium

- Integrate the [Monerium](https://monerium.app/) flow so a user can reach on-ramp and off-ramp from Shebam **without Shebam performing the conversion**. See the [developer documentation](https://monerium.dev/docs) and the [sandbox](https://sandbox.monerium.dev/developers).
- Read Monerium verification status and, where required, gate outbound transfers on it.
- Contractual and technical review to confirm the regulated act stays entirely with Monerium — the second invariant in [LEGAL.md](LEGAL.md#52-no-on-ramp-or-off-ramp-inside-the-application).

**Known friction:** the payer needs EURe before they can pay, which means Monerium onboarding on the sending side. This is the core chicken-and-egg problem and it is not solved by this workstream alone.

### W4 — Payment links

A link that _carries_ value: the recipient can claim a payment without having signed up, without holding an address, and without prior knowledge of Shebam.

- Ephemeral claim key embedded in the link fragment, never transmitted to the server.
- Claim flow that provisions a passkey wallet on first use, so the claim itself is the onboarding.
- Expiry and reclaim path for unclaimed links.
- This closes the loop on the receiving side, where the passkey model is already strongest.

### W5 — Shielded transfers

Confidentiality with respect to the public, not with respect to authorities. Lawful for as long as the conditions in [LEGAL.md §5](LEGAL.md#5-the-three-invariants) hold.

Target: [Privacy Pools](https://docs.privacypools.com/) by [0xbow](https://www.0xbow.io/), whose **V2** design supports **shielded in-pool transfers** — peer-to-peer payments without a withdrawal step — which is precisely the flow a payment application needs. V1, which is already live on Gnosis, offers private _withdrawals_ only and is a poor fit.

State of play:

| Item                    | Status                                                                   |
| ----------------------- | ------------------------------------------------------------------------ |
| Privacy Pools on Gnosis | V1 live; V2 mainnet availability to be confirmed with 0xbow              |
| ERC-20 support          | Built into the protocol; pools are asset-specific                        |
| EURe pool               | Does not exist — supported assets are native tokens plus USDT, USDC, DAI |

Two paths:

1. **Ask 0xbow to add an EURe pool on Gnosis (preferred).** Deploying the contracts is the small part; the hard part is the **Association Set Provider**, an off-chain service that continuously vets deposits. 0xbow already operates an ASP and relayers for their deployments, and their [front end](https://github.com/0xbow-io/privacy-pools-website) is built for adding chains and pools. Shebam then builds against their deployment with the [SDK](https://docs.privacypools.com/reference/sdk).
2. **Self-deploy.** [`privacy-pools-core`](https://github.com/0xbow-io/privacy-pools-core) is open source, so an Entrypoint, an EURe pool and verifiers can be deployed on Gnosis. This inherits operation of the ASP and relayers, and — decisively — a fresh pool used only by Shebam users has an anonymity set too small to provide privacy: timing and amount correlation deanonymise it trivially. **Privacy scales with pool activity.**

Path 1 is preferred for both operational and regulatory reasons: the further Shebam stays from operating the privacy infrastructure, the stronger its position ([LEGAL.md §6.1](LEGAL.md#61-privacy-features-specifically)).

Blocking prerequisites, all of which must clear before any code ships:

- 0xbow confirmation of V2 on Gnosis mainnet and willingness to host an EURe pool;
- **Monerium's compliance position** — EURe is a regulated e-money token whose contract carries administrative controls, including freeze and blacklist; a frozen pool contract would strand user funds;
- written legal opinion on the exact feature set.

### W6 — Merchant tooling

- Invoicing and payment requests.
- Off-ramp guidance for merchants, delegating the regulated act to Monerium.
- Accept-now / verify-to-withdraw split: a merchant starts accepting on day one and completes compliance once, when they want to cash out. Verification burden is deferred, not removed.
- Settlement reporting built from client-side data, not from a server-held ledger.

Any automatic settlement, centralised collection or cashback scheme must be re-tested against [LEGAL.md §8](LEGAL.md#8-the-standing-test-for-new-features) before design begins.

### W7 — Streams

Recurring payments as continuous per-second flows via [Superfluid](https://superfluid.org/) ([docs](https://docs.superfluid.org/)): a subscription of one euro a month, or one cent a second, to a given address. Exploratory, and subordinate to W2 — streams on a modular account are considerably simpler than streams driven by a relayer.

### W8 — Peer-to-peer liquidity exchange

Matching users who want to buy EURe against users who want to sell it, settled off-chain by bank transfer. This is the answer to Monerium's slow onboarding, and it is **the feature that changes Shebam's regulatory nature**.

It requires either Shebam's own authorisation or a partner holding a [MiCA](https://eur-lex.europa.eu/eli/reg/2023/1114/oj/eng) authorisation that **legally bears the matching activity**. It is also mutually exclusive with W5: shielded transfers and a matching engine cannot coexist in the same product.

**No implementation work on this workstream may begin before the written legal opinion described in [LEGAL.md §10](LEGAL.md#10-review).**

## 4. Dependencies and sequencing

```
W0 hardening ──┬─> W1 mainnet ──┬─> W2 account abstraction ──> W7 streams
               │                ├─> W3 Monerium rails ──> W6 merchant tooling
               │                └─> W4 payment links
               └─> W5 shielded transfers   (requires W1 + external prerequisites)

W8 p2p liquidity   (gated on authorisation; mutually exclusive with W5)
```

Rules that hold across the graph:

1. **W0 precedes everything.** A perimeter defect shipped to mainnet is expensive to unwind.
2. **W5 and W8 are mutually exclusive.** Choose one; they cannot ship in the same product.
3. **No workstream ships before its entry in [LEGAL.md §8](LEGAL.md#8-the-standing-test-for-new-features) has been answered.**
4. `pnpm lint` must pass before any workstream is declared done.

## 5. Open technical questions

- **Passkey reliability across devices and browsers.** At least one tester could not complete passkey enrolment. If the authentication layer fails, nothing downstream matters; this needs a compatibility matrix and a documented fallback.
- **Relayer key custody and rotation.** The relayer key is an operational secret with gas-spending authority; it needs a rotation procedure, spend limits and monitoring.
- **RPC dependence.** The shuffled endpoint pool mitigates outages but not censorship; evaluate a self-hosted Gnosis node.
- **EIP-7702 versus ERC-4337.** Pick one and commit; maintaining both doubles the security surface.
- **Anonymity-set bootstrapping.** If an EURe pool is created, how does it reach an activity level at which it actually provides privacy?
- **EURe issuer controls.** What is the concrete procedure if Monerium freezes an address Shebam users depend on?
- **Business model.** Fee-taking is not merely a product question: a fee on transfers is one of the features that must be re-tested against the perimeter.

## Further reading

- [Safe developer documentation](https://docs.safe.global/)
- [Gnosis Chain developer documentation](https://docs.gnosischain.com/)
- [Monerium developer portal](https://monerium.dev/)
- [Privacy Pools deployments](https://docs.privacypools.com/deployments)
- [EIP-7702 specification](https://eips.ethereum.org/EIPS/eip-7702)
- [ERC-4337 specification](https://eips.ethereum.org/EIPS/eip-4337)
- [WebAuthn Level 2 specification](https://www.w3.org/TR/webauthn-2/)
- [WCAG accessibility guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Shebam legal position](LEGAL.md)
