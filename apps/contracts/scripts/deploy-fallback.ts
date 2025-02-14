import { ethers } from "hardhat";

async function deploy() {
  const Fallback = await ethers.getContractFactory("Fallback");
  const fallback = await Fallback.deploy();
  await fallback.waitForDeployment();

  return fallback;
}

deploy().then(async (fallback) => {
  const f = await ethers.getContractAt("IFallback", await fallback.getAddress());
  console.log("Hello World is : ", await f.count());
});
