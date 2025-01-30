import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  //solidity: "0.8.28",
  networks: {
    hardhat: {
      // from https://docs.metamask.io/wallet/how-to/run-devnet/
      //accounts: {
      //  // WARNING:
      //  // Your seed phrase controls all your accounts, so we recommend keeping at least one seed phrase for development,
      //  // separate from any used to store real value. You can manage multiple seed phrases by using multiple browser profiles,
      //  // each with its own MetaMask installation.
      //  //mnemonic: process.env.SEED_PHRASE,
      //},
      chainId: 1337,
    }
  }
};

console.log({ config, phrase: process.env.SEED_PHRASE });

export default config;
