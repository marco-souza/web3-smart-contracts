import { ethers } from "hardhat";

async function deploy() {
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  await myNFT.waitForDeployment();

  return myNFT;
}

deploy().then(async (c) => {
  console.log("MyNFT address is : ", await c.getAddress());
  console.log("MyNFT name is : ", await c.name());
  console.log("MyNFT symbol is : ", await c.symbol());
});
