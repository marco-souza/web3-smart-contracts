import { expect } from "chai";
import hre from "hardhat";

describe("Hero", () => {
  async function createHero() {
    const Hero = await hre.ethers.getContractFactory("Hero");
    const hero = await Hero.deploy();
    await hero.waitForDeployment();

    return hero;
  }

  it("should fail to create a hero cause of payment", async () => {
    const hero = await createHero();
    await expect(hero.createHero()).to.be.revertedWith("Please send at least 0.05 ether");
  });
})
