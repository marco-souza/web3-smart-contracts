# Web3 Smart Contracts

This repository is a part of the "Web3 Smart Contracts" course by The Primeagen on Frontend Masters.

The course provides a comprehensive introduction to building decentralized applications using Web3 technologies.

- https://frontendmasters.com/courses/web3-smart-contracts/

## Prerequisites

- [Bun](https://bun.sh/) installed for running JavaScript applications
- [direnv](https://direnv.net/) installed for environment variable management
- [MetaMask](https://metamask.io/) installed and configured
- Basic understanding of JavaScript and blockchain concepts

## Environment Setup

Ensure you have a `.env` file in the project root. The environment variables will be automatically loaded by `direnv`.

## Installation

To install the necessary dependencies, run:

```bash
bun install
```

## Running the Project

To start the project, execute:

```bash
bun run index.ts
```

## Monorepo Structure

This project is organized as a Bun monorepo, containing multiple applications:

- **Contracts**: The smart contracts are written in Solidity and are located in the `apps/contracts/` directory.
- **Frontend**: The frontend application is located in the `apps/frontend/` directory.
- **Backend**: The backend application is located in the `apps/backend/` directory.

## Contracts

You can compile, test, and deploy the smart contracts using the following commands:

```bash
bun run compile
bun run test
bun run deploy
```

## Running Locally

To test the project locally, ensure MetaMask is connected to your local network. Follow these steps:

1. Run the local network:
   ```bash
   bun run local:net
   ```

2. Add the local network to MetaMask:
   - Network Name: Localhost 8545
   - New RPC URL: http://localhost:8545
   - Chain ID: 1337
   - Currency Symbol: ETH

3. Set up the created accounts in your MetaMask wallet.

4. Deploy contracts to the local network:
   ```bash
   bun run local:deploy
   ```

5. Run the tests:
   ```bash
   bun run test
   ```

## Additional Resources

For more information, refer to the following resources:
- [MetaMask Documentation](https://docs.metamask.io/wallet/how-to/run-devnet/)
- [Hardhat Network Reference](https://hardhat.org/hardhat-network/docs/reference#accounts)

This project was created using `bun init` in bun v1.2.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

