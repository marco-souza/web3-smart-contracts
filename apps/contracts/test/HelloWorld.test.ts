import { expect } from "chai";
import hre from "hardhat";

describe("HelloWorld", () => {
  it("Should return the right greeting", async () => {
    const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();

    expect(await helloWorld.hello()).to.equal("Hello, World!");
  })
})
