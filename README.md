# cryptobuilder.ia

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Contracts

The contracts are written in Solidity and can be found in the `apps/contracts/` directory.

```bash
bun run compile
bun run test
bun run deploy


# running locally
```

> [!WARNING]
> To test this project locally you need to have MetaMask installed and configured. Once you have that you can connect to your local network
> - https://docs.metamask.io/wallet/how-to/run-devnet/
> - https://hardhat.org/hardhat-network/docs/reference#accounts


### Running locally

- run `bun run local:net` to deploy the contract to your local network
- add the local network to MetaMask
  - Network Name: Localhost 8545
  - New RPC URL: http://localhost:8545
  - Chain ID: 1337
  - Currency Symbol: ETH
- setup the created accounts to your MetaMask wallet
- run `bun run local:deploy` to create accounts for the local network
- run `bun run test` to run the tests


