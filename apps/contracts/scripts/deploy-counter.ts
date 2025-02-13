import { ethers } from "hardhat";
import { Counter } from "../typechain-types";

async function deploy() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.waitForDeployment();

  return counter;
}

async function counter(counter: Counter) {
  await counter.count();
  const val = await counter.getCounter();
  console.log("Counter is : ", val);
}

deploy().then(async (c) => {
  await counter(c);
  await counter(c);
  await counter(c);
  await counter(c);
  await counter(c);
  await counter(c);
  await counter(c);
});
