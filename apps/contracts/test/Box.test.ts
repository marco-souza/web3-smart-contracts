import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersHelpers } from "hardhat/types";
import { Box } from "../typechain-types/contracts/Box";

type Signer = Awaited<ReturnType<HardhatEthersHelpers["getSigner"]>>;

describe("Box Contract", function () {
  let box: Box;
  let owner: Signer;
  let notOwner: Signer;

  before(async function () {
    const signers = await ethers.getSigners();
    [owner, notOwner] = signers;

    const BoxFactory = await ethers.getContractFactory("Box");
    box = await BoxFactory.deploy();
    await box.waitForDeployment();
  });

  it("should deploy the Box contract", async function () {
    expect(await box.getAddress()).to.properAddress;
  });

  it("should have initial value of 0", async function () {
    const initialValue = await box.retrieve();
    expect(initialValue).to.equal(0);
  });

  it("should store a value", async function () {
    await box.store(42);
    const updatedValue = await box.retrieve();
    expect(updatedValue).to.equal(42);
  });

  it("should not allow non-owner to store a value", async function () {
    const boxWithNotOwner = box.connect(notOwner);
    await expect(boxWithNotOwner.store(100))
      .to.be.revertedWithCustomError(box, "OwnableUnauthorizedAccount")
      .withArgs(notOwner.address);
  });

  it("should allow owner to retrieve a value", async function () {
    const value = await box.retrieve();
    expect(value).to.equal(42);
  });

  it("should not allow non-owner to retrieve a value", async function () {
    const boxWithNotOwner = box.connect(notOwner);
    await expect(boxWithNotOwner.retrieve())
      .to.be.revertedWithCustomError(box, "OwnableUnauthorizedAccount")
      .withArgs(notOwner.address);
  });
});
