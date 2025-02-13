// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./Storage.sol";

contract A {
  AppStorage internal s;

  function setA(uint _a) public {
    s.a = _a;
  }

  function getA() public view returns (uint) {
    return s.a;
  }
}

contract B {
  AppStorage internal s;

  constructor(address _A) {
    s.A = _A;
    s.b = 8;
    s.c = 0x45;
    s.d = 0xF5;
    s.e = 0x0F;
  }

  function setB(uint8 _b) public {
    s.b = _b;

    // cast A and set A
    A(s.A).setA(_b + 1);
  }

  function setBDel(uint8 _b) public {
    s.b = _b;

    // delegate call to A
    (bool success, bytes memory _data) = s.A.delegatecall(
      abi.encodeWithSignature("setA(uint256)", _b + 1)
    );

    require(success, "Delegate call failed");

  }

  function getB() public view returns (uint8) {
    return s.b;
  }
}
