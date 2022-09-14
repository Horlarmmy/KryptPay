const { ethers } = require("hardhat");

const DEFAULT_PURCHASE_RATIO = 10;

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with the account: ${deployer.address}`);

    const balance = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`);
    const TokenFactory = await ethers.getContractFactory("KryptPayToken");
    const Tokencontract = await TokenFactory.deploy();
    await Tokencontract.deployed();
    console.log("Token deployed to:", Tokencontract.address);
    const AppFactory = await ethers.getContractFactory("Kryptpay");
    const Appcontract = await AppFactory.deploy(DEFAULT_PURCHASE_RATIO, Tokencontract.address);

    await Appcontract.deployed();

    console.log("App deployed to:", Appcontract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });