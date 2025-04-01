import { ethers } from "hardhat";

const owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

async function deploy() {
  const BoxFactory = await ethers.getContractFactory("Box");
  const box = await BoxFactory.deploy(owner);
  await box.waitForDeployment();

  return box;
}

deploy().then(async (box) => {
  console.log(`Box contract deployed at address: ${await box.getAddress()}`);

  const signers = await ethers.getSigners();
  console.log("Available signers:", signers.map(signer => signer.address), signers.length);

  const [_ownerSigner, notOwner] = signers;
  const initialValue = await box.retrieve();
  console.log(`Initial value stored in Box: ${initialValue}`);

  await box.store(42);
  console.log(`Value 42 stored in Box.`);

  const updatedValue = await box.retrieve();
  console.log(`Updated value retrieved from Box: ${updatedValue}`);

  // use contract address as sender
  const boxWithNotOwner = box.connect(notOwner);
  console.log(`Using contract address ${notOwner} as sender.`);

  await boxWithNotOwner.retrieve().catch(e => {
    console.warn(`Error retrieving value from Box as sender: ${e.message}`, e);
  })

  await boxWithNotOwner.store(100).catch(e => {
    console.warn(`Error storing value in Box as sender: ${e.message}`, e);
  })

});

