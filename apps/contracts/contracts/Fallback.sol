// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

interface IFallback {
  function count() external;
}

contract Fallback {
  function foo() internal view {
    console.log("Fallback.foo was called");
  }

  fallback() external payable {
    foo();
    console.log("Fallback.fallback was called");

    revert("You shoudn't be here");
  }
}
