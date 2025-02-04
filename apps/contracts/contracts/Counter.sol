// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Counter {
  uint counter;

  function count() public returns (uint) {
    counter++;
    console.log("Counter is now", counter);
    return counter;
  }

  function getCounter() public view returns (uint) {
    return counter;
  }
}
