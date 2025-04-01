// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "hardhat/console.sol";
import "./Auth.sol";

contract Box {
    uint256 private _value;
    Auth private _auth;

    constructor(address deployer) {
        _auth = new Auth(deployer);
    }

    event ValueChanged(uint256 value);

    function store(uint256 value) public {
        require(_auth.isAuthorized(msg.sender), "Not authorized");
        require(value > 0, "Value must be greater than 0");

        _value = value;

        emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        require(_auth.isAuthorized(msg.sender), "Not authorized");

        return _value;
    }
}
