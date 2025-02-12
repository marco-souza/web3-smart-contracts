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

  it("should generate a random number", async () => {
    const hero = await createHero();
    const res = hero.generateRandom()
    const randomNum = await res;

    await expect(res).to.not.be.reverted;
    expect(randomNum).to.be.greaterThan(0);
    // check if is bigint
    expect(typeof randomNum).to.equal("bigint");
  })
})


describe("TestHero", () => {
  async function createHero() {
    const Hero = await hre.ethers.getContractFactory("TestHero");
    const hero = await Hero.deploy();
    await hero.waitForDeployment();

    return hero;
  }

  it("check if empty array", async () => {
    const hero = await createHero();
    expect(await hero.getHeroes()).to.lengthOf(0);
  })

  it("check the class of a created hero", async () => {
    const hero = await createHero();

    await hero.setRandom(69);
    await hero.createHero(2, { value: ethers.parseEther("0.05") });

    await hero.setRandom(420);
    await hero.createHero(0, { value: ethers.parseEther("0.05") });

    const [h1, h2] = await hero.getHeroes();

    // [ C, S, H, D, I, M ]
    expect(await hero.getClass(h1)).to.equal(2);
    // [ S, H, D, I, M ], p: 4, v: 16
    expect(await hero.getMagic(h1)).to.equal(16);
    // [ S, H, D, I ],    p: 1, v: 2
    expect(await hero.getHealth(h1)).to.equal(2);
    // [ S, I, D ],       p: 0, v: 6
    expect(await hero.getStrength(h1)).to.equal(6);
    // [ D, I ],          p: 1, v: 10
    expect(await hero.getIntellect(h1)).to.equal(10);
    // [ D ],             p: 0, v: 14
    expect(await hero.getDexterity(h1)).to.equal(14);

    // [ C, S, H, D, I, M ]
    expect(await hero.getClass(h2)).to.equal(0);
    // [ S, H, D, I, M ], p: 0, v: 7
    expect(await hero.getStrength(h2)).to.equal(7);
    // [ M, H, D, I ],    p: 0, v: 13
    expect(await hero.getMagic(h2)).to.equal(13);
    // [ I, H, D ],       p: 0, v: 5
    expect(await hero.getIntellect(h2)).to.equal(5);
    // [ D, H ],          p: 0, v: 1
    expect(await hero.getDexterity(h2)).to.equal(1);
    // [ H ],             p: 0, v: 1
    expect(await hero.getHealth(h2)).to.equal(1);

  })
})

