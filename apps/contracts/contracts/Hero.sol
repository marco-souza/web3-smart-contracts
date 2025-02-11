// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Hero {
  enum Class { Mage, Warrior, Archer, Priest, Barbarian, Rogue }

  mapping(address => uint[]) public addressToHeroes;

  function getHeroes() public view returns (uint[] memory) {
    return addressToHeroes[msg.sender];
  }

  function createHero(Class heroClass) public payable {
    require(msg.value >= 0.05 ether, "Please send at least 0.05 ether");

    console.log("Create hero to user %s with Class %d", msg.sender, uint(heroClass));
  }
}
