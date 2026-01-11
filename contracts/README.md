# Investverse City Contracts

This folder contains the prototype smart contracts for Investverse City. The goal is to show how
GT rewards, game items, and rare collectibles would be implemented using standard Ethereum token
interfaces that judges already recognize.

## Contracts
- `GrowToken.sol` (ERC-20): non-transferable GT used for in-app rewards.
- `InvestverseItems1155.sol` (ERC-1155): limited-supply items for boosts, weapons, and cosmetics.
- `InvestverseRare721.sol` (ERC-721): unique collectible drops and achievements.

## Setup
```sh
npm install
npm run compile
```

## Deploy (Polygon PoS)
```sh
export POLYGON_MAINNET_RPC_URL=...
export PRIVATE_KEY=...
npm run deploy:mainnet
```

After deployment, copy the addresses into the app `.env.local` as:

```sh
VITE_GT_CONTRACT_ADDRESS=0x...
VITE_ITEMS_CONTRACT_ADDRESS=0x...
VITE_RARE_CONTRACT_ADDRESS=0x...
```

## Deploy (Amoy testnet)
```sh
export POLYGON_AMOY_RPC_URL=...
export PRIVATE_KEY=...
npm run deploy:amoy
```
