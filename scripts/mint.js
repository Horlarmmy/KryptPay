const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x560FE3a2a51b2a70d094E28f090B2B3c6c51343A";
const TOKEN_ADDRESS = "0x23634eC5f7cFF2715554b0A1fCe26C40BdD79BA9";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with the account: ${deployer.address}`);

    const balance = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`);
    const TokenFactory = await ethers.getContractFactory("KryptPayToken");
    const Tokencontract = await TokenFactory.attach(TOKEN_ADDRESS);
    const AFactory = await ethers.getContractFactory("Kryptpay");
    const Appcontract = await AFactory.attach(CONTRACT_ADDRESS);

    const minterRole = await Tokencontract.MINTER_ROLE();
    const minterRoleTx = await Tokencontract.grantRole(
      minterRole,
      Appcontract.address
    );
    await minterRoleTx.wait();

    await Appcontract.purchaseTokens({ value: ethers.utils.parseEther("0.0001")}).then((txn) => {
        // Log Txn
        console.log(txn.hash)
        return(txn)

    });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });