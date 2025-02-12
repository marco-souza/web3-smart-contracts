// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Hero {
  enum Class { Mage, Warrior, Barbarian } // max: 4 0x2

  mapping(address => uint[]) public addressToHeroes;

  function getHeroes() public view returns (uint[] memory) {
    return addressToHeroes[msg.sender];
  }

  function createHero(Class heroClass) public payable {
    require(msg.value >= 0.05 ether, "Please send at least 0.05 ether");

    console.log("Create hero to user %s with Class %d", msg.sender, uint(heroClass));

    // stats are randomly generated
    // class, strength, health, dexterity, intellect, magic
    // [  11,    11111,  11111,     11111,     11111, 11111 ] = 27 bits hero

    // define stats array
    uint[] memory stats = new uint[](5);

    stats[0] = 2; // skip 0x2
    stats[1] = 7; // skip 0x2 + 0x5 (store stats values) = 0x7
    stats[2] = 12; // skip 0xC
    stats[3] = 17; // skip 0x11
    stats[4] = 22; // skip 0x16

    uint len = 5;
    uint hero = uint(heroClass);

    do {
      uint pos = generateRandom() % len;
      uint value = generateRandom() % (13 + len) + 1;

      // shift the value to the correct position + add to the hero
      hero |= value << stats[pos];
      console.log("pos: %d, value: %d, hero: %d", pos, value, hero);

      // decrement length
      len--;

      // overwrite the stats[pos] with the last element
      stats[pos] = stats[len];
    } while (len > 0);

    addressToHeroes[msg.sender].push(hero);
  }

  function getClass(uint hero) public pure returns (Class) {
    return Class(hero & 0x2); // 11
  }

  function getStrength(uint hero) public pure returns (uint) {
    return (hero >> 2) & 0x1F; // 11111
  }

  function getHealth(uint hero) public pure returns (uint) {
    return (hero >> 7) & 0x1F; // 11111
  }

  function getDexterity(uint hero) public pure returns (uint) {
    return (hero >> 12) & 0x1F; // 11111
  }

  function getIntellect(uint hero) public pure returns (uint) {
    return (hero >> 17) & 0x1F; // 11111
  }

  function getMagic(uint hero) public pure returns (uint) {
    return (hero >> 22) & 0x1F; // 11111
  }

  function generateRandom() virtual public view returns (uint) {
    return uint(
      keccak256( // generate 256 bites random numbers
        abi.encodePacked(block.timestamp, block.prevrandao) // dificulty
      )
    );
  }
}
