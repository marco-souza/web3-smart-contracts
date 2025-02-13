import { ContractFactory } from "ethers";
import { ethers } from "hardhat";

class Foo {
  private bar!: number;
  foo() {
    console.log("Foo", this.bar);
  }
}

const foo = new Foo()
foo.foo()

foo.foo.call({ bar: 42 })


async function deploy(Contract: ContractFactory, ...args) {
  const c = await Contract.deploy(...args);
  await c.waitForDeployment();

  return c;
}

const main = async () => {
  const A = await ethers.getContractFactory("A");
  const a = await deploy(A)

  const B = await ethers.getContractFactory("B");
  const b = await deploy(B, await a.getAddress())

  console.log("A", await a.getA())
  console.log("B", await b.getB())
  console.log("-----------")


  await a.setA(420)
  console.log("A", await a.getA())
  console.log("B", await b.getB())
  console.log("-----------")

  await b.setB(69)
  console.log("A", await a.getA())
  console.log("B", await b.getB())
  console.log("-----------")

};

main()
