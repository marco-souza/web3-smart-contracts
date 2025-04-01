// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Auth {
    address private _administrator;

    constructor(address deployer) {
        _administrator = deployer;
    }

    function isAuthorized(address user) public view returns (bool) {
        console.log(user, _administrator);
        return user == _administrator;
    }
}
