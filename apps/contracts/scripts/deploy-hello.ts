import { ethers } from "hardhat";

async function deploy() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const hello = await HelloWorld.deploy();
  await hello.waitForDeployment();

  return hello;
}

deploy().then(async (c) => {
  console.log("Hello World is : ", await c.hello());
});
