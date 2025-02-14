// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

struct AppStorage {
  uint a;
  uint8 b;
  uint8 c;
  uint8 d;
  uint8 e;

  address A;
}

library Storage {
  bytes32 constant KEY = keccak256("storage.app");

  function get() internal pure returns (AppStorage storage s) {
    // NOTE: assembly only reads local scope variables
    bytes32 k = KEY;
    assembly {
      s.slot := k
    }
  }
}
