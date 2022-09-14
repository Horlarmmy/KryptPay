/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

const INFURA_URL = 'https://rinkeby.infura.io/v3/';
const PRIVATE_KEY = '';

module.exports = {
    solidity: "0.8.9",
    networks: {
     rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
     }
    }
   };