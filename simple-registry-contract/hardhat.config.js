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
  etherscan: {
    apiKey: process.env.APIKEY,
  },
};
// 0x592ccbff9CD246ba87E38a1D31f4bc6e0EAd4955
