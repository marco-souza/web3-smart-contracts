// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract HelloWorld {
  function hello() public pure returns (string memory) {
    return "Hello, World from Solidity!";
  }
}
