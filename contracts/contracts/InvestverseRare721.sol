// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/// @notice Unique collectibles for rare drops and achievements.
contract InvestverseRare721 is ERC721, Ownable {
    uint256 public nextTokenId;
    string private baseTokenURI;

    constructor(address owner, string memory baseURI) ERC721("Investverse Rare", "IVR") Ownable(owner) {
        baseTokenURI = baseURI;
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        baseTokenURI = baseURI;
    }

    function mint(address to) external onlyOwner returns (uint256) {
        nextTokenId += 1;
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        return tokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
}
