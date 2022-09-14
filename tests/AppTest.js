const { expect } = require('chai');
const { ethers } = require('hardhat');

const DEFAULT_PURCHASE_RATIO = 10;


describe('Token contract', () => {
  let tokenContract, AppContract, owner, addr1, addr2;

  beforeEach(async () => {
    [owner, addr1, addr2, _] = await ethers.getSigners();
    const [tokenFactory, AppFactory] =
      await Promise.all([
        ethers.getContractFactory("KryptPayToken"),
        ethers.getContractFactory("Kryptpay"),
      ]);
    
    tokenContract = await tokenFactory.deploy();
    await tokenContract.deployed();
    AppContract = await AppFactory.deploy();
    await AppContract.deployed();
  });

  describe('Deployment', () => {
    it('Should set the right owner', async() => {
      expect(await token.owner()).to.equal(owner.address);
    });
    it('Should assign the total supply of tokens to the owner', async() => {
      const ownerBal = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBal);
    })
  })
})