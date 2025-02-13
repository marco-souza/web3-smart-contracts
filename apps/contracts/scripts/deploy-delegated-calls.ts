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


async function deploy(name: string, ...args) {
  const Contract = await ethers.getContractFactory(name);
  const c = await Contract.deploy(...args);
  await c.waitForDeployment();

  return c;
}

//const main = async () => {
//  const a = await deploy("A")
//  const b = await deploy("B", await a.getAddress())
//
//  console.log("A", await a.getA())
//  console.log("B", await b.getB())
//  console.log("-----------")
//
//
//  await a.setA(420)
//  console.log("A", await a.getA())
//  console.log("B", await b.getB())
//  console.log("-----------")
//
//  await b.setB(69)
//  console.log("A", await a.getA())
//  console.log("B", await b.getB())
//  console.log("-----------")
//
//  await b.setBDel(30)
//  console.log("A", await a.getA())
//  console.log("B", await b.getB())
//  console.log("-----------")
//
//  console.log("A", await a.getA())
//  console.log("B", await b.getB())
//  console.log("-----------")
//
//};

async function printStorage(contract, name, count) {
  console.log(name)
  for (let i = 0; i < count; i++) {
    const addr = await contract.getAddress()
    console.log(
      i,
      await ethers.provider.getStorage(addr, i)
    )
  }
}

const main = async () => {
  const a = await deploy("A")
  const b = await deploy("B", await a.getAddress())

  printStorage(b, "B", 4)


};

main()
