export const CONTRACT_ADDRESS = "0x592ccbff9CD246ba87E38a1D31f4bc6e0EAd4955";

export const ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "age",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getEntityDetails",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "age",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newAge",
        type: "uint256",
      },
    ],
    name: "updateAge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newName",
        type: "string",
      },
    ],
    name: "updateName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
