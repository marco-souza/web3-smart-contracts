// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "./Hero.sol";

contract TestHero is Hero {
  uint random;

  // override random
  function generateRandom() public override view returns (uint) {
    return random;
  }

  function setRandom(uint _random) public {
    random = _random;
  }
}
