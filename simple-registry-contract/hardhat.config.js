require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.URL,
      accounts: [`0x${process.env.KEY}`],
    },
  },
};
// 0x9afeBF584c5f57Db7f46cc9162722b27856D5C22
