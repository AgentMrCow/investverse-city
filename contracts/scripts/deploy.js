const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with:", deployer.address);

  const GrowToken = await ethers.getContractFactory("GrowToken");
  const growToken = await GrowToken.deploy(deployer.address);
  await growToken.waitForDeployment();

  const Items1155 = await ethers.getContractFactory("InvestverseItems1155");
  const items1155 = await Items1155.deploy(deployer.address, "ipfs://items/{id}.json");
  await items1155.waitForDeployment();

  const Rare721 = await ethers.getContractFactory("InvestverseRare721");
  const rare721 = await Rare721.deploy(deployer.address, "ipfs://rare/");
  await rare721.waitForDeployment();

  console.log("GrowToken:", await growToken.getAddress());
  console.log("InvestverseItems1155:", await items1155.getAddress());
  console.log("InvestverseRare721:", await rare721.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
