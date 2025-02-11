import { expect } from "chai";
import hre, { ethers } from "hardhat";

const insufficientFunds = "Please send at least 0.05 ether"

describe("Hero", () => {
  async function createHero() {
    const Hero = await hre.ethers.getContractFactory("Hero");
    const hero = await Hero.deploy();
    await hero.waitForDeployment();

    return hero;
  }

  it("should fail to create a hero cause of payment with no argument", async () => {
    const hero = await createHero();
    const res = hero.createHero(0);
    await expect(res).to.be.revertedWith(insufficientFunds);
  })

  it("should fail to create a hero cause of payment", async () => {
    const hero = await createHero();
    const res = hero.createHero(0, { value: ethers.parseEther("0.04999999999") });

    await expect(res).to.be.revertedWith(insufficientFunds);
  });

  it("should create a hero", async () => {
    const hero = await createHero();
    const res = hero.createHero(0, { value: ethers.parseEther("0.05") });

    await expect(res).to.not.be.reverted;
  });
})
