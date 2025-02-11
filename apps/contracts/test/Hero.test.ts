import { expect } from "chai";
import hre from "hardhat";
import { ONE_GWEI } from "./contants";

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
    const res = hero.createHero();
    await expect(res).to.be.revertedWith(insufficientFunds);
  })

  it("should fail to create a hero cause of payment", async () => {
    const hero = await createHero();
    const res = hero.createHero({ value: 0.0499999 * ONE_GWEI });

    await expect(res).to.be.revertedWith(insufficientFunds);
  });
})
