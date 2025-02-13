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
  uint c;
  uint d;
  uint e;
  address ContractA;

  constructor(address _A) {
    ContractA = _A;
    b = 8;
    c = 0x45;
    d = 0xF5;
    e = 0x0F;
  }

  function setB(uint _b) public {
    b = _b;

    // cast A and set A
    A(ContractA).setA(_b + 1);
  }

  function setBDel(uint _b) public {
    b = _b;

    // delegate call to A
    (bool success, bytes memory _data) = ContractA.delegatecall(
      abi.encodeWithSignature("setA(uint256)", b + 1)
    );

    require(success, "Delegate call failed");

  }

  function getB() public view returns (uint) {
    return b;
  }
}
