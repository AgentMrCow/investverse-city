// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/// @notice Limited-supply items for boosts, weapons, and cosmetics.
contract InvestverseItems1155 is ERC1155, Ownable {
    mapping(uint256 => uint256) public maxSupply;
    mapping(uint256 => uint256) public totalSupply;

    constructor(address owner, string memory uri) ERC1155(uri) Ownable(owner) {}

    function setMaxSupply(uint256 id, uint256 max) external onlyOwner {
        maxSupply[id] = max;
    }

    function mint(address to, uint256 id, uint256 amount) external onlyOwner {
        uint256 max = maxSupply[id];
        if (max != 0 && totalSupply[id] + amount > max) {
            revert("Max supply exceeded");
        }
        _mint(to, id, amount, "");
        totalSupply[id] += amount;
    }

    function burn(address from, uint256 id, uint256 amount) external onlyOwner {
        _burn(from, id, amount);
        totalSupply[id] -= amount;
    }
}
