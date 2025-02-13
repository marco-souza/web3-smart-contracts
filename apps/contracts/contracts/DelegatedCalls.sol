// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract A {
  uint value;

  function setA(uint _a) public {
    value = _a;
  }

  function getA() public view returns (uint) {
    return value;
  }
}

contract B {
  uint value;
  address ContractA;

  constructor(address _A) {
    ContractA = _A;
  }

  function setB(uint _b) public {
    value = _b;

    // cast A and set A
    A(ContractA).setA(_b + 1);
  }

  function setBDel(uint _b) public {
    value = _b;

    // delegate call to A
    (bool success, bytes memory data) = ContractA.delegatecall(
      abi.encodeWithSignature("setA(uint256)", _b + 1)
    );

    console.log("Delegate call success: %s", success);
    // console.log("Delegate call data: %s", data);

    require(success, "Delegate call failed");

  }

  function getB() public view returns (uint) {
    return b;
  }
}
