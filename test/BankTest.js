/* eslint-disable */

const { ethers } = require('hardhat');
const { use, expect } = require('chai');
const { solidity } = require('ethereum-waffle');

use(solidity);

const SecondsInMonth = 86400 * 30;

describe('Bank Contract', function () {
  it('Defining Generals', async function () {
    // General
    provider = ethers.provider;
    accounts = await hre.ethers.getSigners();

    await ethers.provider.send('evm_setNextBlockTimestamp', [Date.now()]);
    await ethers.provider.send('evm_mine');
  });

  it('Deploying Contracts', async function () {
    const Token = await ethers.getContractFactory('ERC20Token');
    token = await Token.deploy(
      'Tok',
      'TOK',
      ethers.utils.parseEther('100000000000000')
    );

    await token.deployed();

    const BankContract = await ethers.getContractFactory('Bank');
    bankContract = await BankContract.deploy(token.address);
    await bankContract.deployed();
  });

  it('Setup Fixed Deposit', async function () {
    await bankContract.setupFixedDeposit(
      true,
      1,
      6,
      15,
      24,
      ethers.utils.parseEther('100')
    );

    const fixedDepositInfo = await bankContract.fixedDepositInfo();
    expect(fixedDepositInfo.minimumDeposit).to.equal(ethers.utils.parseEther('100'));
  });

  it('Deposit Rewards', async function () {
    await token.approve(
      bankContract.address,
      ethers.utils.parseEther('10000000')
    );

    await bankContract.depositRewards(ethers.utils.parseEther('1000'));

    const rewardsBalance = await bankContract.rewardsBalance();
    expect(rewardsBalance).to.equal(ethers.utils.parseEther('1000'));
  });

  it('Transfer Tokens to Account 2', async function () {
    await token.transfer(accounts[2].address, ethers.utils.parseEther('1000'));

    balance = await token.balanceOf(accounts[2].address);
    expect(balance).to.equal(ethers.utils.parseEther('1000'));
  });

  it('Transfer Tokens to Account 3', async function () {
    await token.transfer(accounts[3].address, ethers.utils.parseEther('2000'));

    balance = await token.balanceOf(accounts[3].address);
    expect(balance).to.equal(ethers.utils.parseEther('2000'));
  });

  it('Deposit in fixed deposit Account 2', async function () {
    await token
      .connect(accounts[2])
      .approve(bankContract.address, ethers.utils.parseEther('1000000'));

    await bankContract
      .connect(accounts[2])
      .deposit(ethers.utils.parseEther('1000'), 3);

    const userInfo = await bankContract.userInfo(accounts[2].address);
    expect(userInfo.amountDeposited).to.equal(ethers.utils.parseEther('1000'));
  });

  it('Deposit in fixed deposit Account 3', async function () {
    await token
      .connect(accounts[3])
      .approve(bankContract.address, ethers.utils.parseEther('1000000'));

    await bankContract
      .connect(accounts[3])
      .deposit(ethers.utils.parseEther('2000'), 6);

    const userInfo = await bankContract.userInfo(accounts[3].address);
    expect(userInfo.amountDeposited).to.equal(ethers.utils.parseEther('2000'));
  });

  it('Calculate Rewards after 1 month', async function () {
    await ethers.provider.send('evm_increaseTime', [SecondsInMonth]);
    await ethers.provider.send('evm_mine');

    const rewards = await bankContract.calculateRewards(
      accounts[2].address
    );

    expect(rewards).to.equal(ethers.utils.parseEther('20'));
  });

  it('Calculate Rewards after 2 months', async function () {
    await ethers.provider.send('evm_increaseTime', [SecondsInMonth]);
    await ethers.provider.send('evm_mine');

    const rewards = await bankContract.calculateRewards(
      accounts[2].address
    );

    expect(rewards).to.equal(ethers.utils.parseEther('40'));
  });

  it('Calculate Rewards after 3 months', async function () {
    await ethers.provider.send('evm_increaseTime', [SecondsInMonth]);
    await ethers.provider.send('evm_mine');

    const rewards = await bankContract.calculateRewards(
      accounts[2].address
    );

    expect(rewards).to.equal(ethers.utils.parseEther('60'));
  });

  it('Calculate Rewards after 4 months', async function () {
    await ethers.provider.send('evm_increaseTime', [SecondsInMonth]);
    await ethers.provider.send('evm_mine');

    const rewards = await bankContract.calculateRewards(
      accounts[2].address
    );
    expect(rewards).to.equal(ethers.utils.parseEther('60'));
  });

  it('Withdraw Account 2', async function () {
    await bankContract.connect(accounts[2]).withdraw();
    balance = await token.balanceOf(accounts[2].address);
    expect(balance).to.equal(ethers.utils.parseEther('1060'));
  });

  it('Emergency Withdraw Account 3', async function () {
    await bankContract.connect(accounts[3]).emergencyWithdraw();
    balance = await token.balanceOf(accounts[3].address);
    expect(balance).to.equal(ethers.utils.parseEther('2000'));
  });
});
