import { expect } from 'chai';
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

const NUMBER = 1212;

describe('Hello World', () => {
  let contract: Contract;
  before(async () => {
    const ContractFactory: ContractFactory = await ethers.getContractFactory('HelloWorld');
    contract = await ContractFactory.deploy();
    await contract.deployed();
  });

  it('Should be able to store a new unsigned integer and retrieve that integer', async () => {
    let tx = await contract.storeNumber(NUMBER);
    await tx.wait();
    const storedNumber = await contract.retrieveNumber();
    expect(storedNumber).to.equal(NUMBER);
  });
});
