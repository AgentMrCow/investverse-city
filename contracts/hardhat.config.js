require("@nomicfoundation/hardhat-toolbox");
const fs = require("fs");
const path = require("path");
const envPath = fs.existsSync(path.resolve(__dirname, ".env.local"))
  ? path.resolve(__dirname, ".env.local")
  : path.resolve(__dirname, ".env");
require("dotenv").config({ path: envPath });

const { POLYGON_MAINNET_RPC_URL, POLYGON_AMOY_RPC_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  networks: {
    polygon: {
      url: POLYGON_MAINNET_RPC_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    amoy: {
      url: POLYGON_AMOY_RPC_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};
