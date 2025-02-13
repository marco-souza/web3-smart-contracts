// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract A {
  uint a;

  function setA(uint _a) public {
    a = _a;
  }

  function getA() public view returns (uint) {
    return a;
  }
}

contract B {
  uint b;
  address ContractA;

  constructor(address _A) {
    ContractA = _A;
  }

  function setB(uint _b) public {
    b = _b;

    // cast A and set A
    A(ContractA).setA(_b + 1);
  }

  function getB() public view returns (uint) {
    return b;
  }
}
