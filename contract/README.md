# EUR Token Contract

## Setup

```bash
forge install
```

## Test

```bash
forge test -vv
```

## Deploy to Chiado

```bash
forge script script/Deploy.s.sol:DeployEUR --rpc-url chiado --broadcast --verify
```

Or without verification:

```bash
forge script script/Deploy.s.sol:DeployEUR --rpc-url chiado --broadcast
```

## Verify Contract (if deployed without --verify)

```bash
forge verify-contract <CONTRACT_ADDRESS> src/Euro.sol:EUR --chain chiado
```

## After Deployment

Update `../src/lib/constants.ts` with the new contract address:

```typescript
export const EURO_TOKEN_ADDRESS = '<DEPLOYED_ADDRESS>'
```
