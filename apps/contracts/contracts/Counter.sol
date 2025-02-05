// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Counter {
  uint counter;

  constructor() {
    counter = 0;
  }

  // change state (use gas)
  function count() public {
    counter++;
    console.log("Counter is now", counter);
  }

  // view state (no gas)
  function getCounter() public view returns (uint) {
    return counter;
  }

  // pure function (no gas)
  function ping() public pure returns (string memory) {
    return "pong";
  }
}
