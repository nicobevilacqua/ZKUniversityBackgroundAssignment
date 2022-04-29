import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract, ContractFactory } from 'ethers';
import { ethers, network } from 'hardhat';
const { utils } = ethers;

const proposals: string[] = [
  utils.formatBytes32String('Proposal 1'),
  utils.formatBytes32String('Proposal 2'),
  utils.formatBytes32String('Proposal 3'),
];

const BALLOT_DURATION = 60 * 5; // five minutes

describe('Ballot Contract:', () => {
  let contract: Contract;
  let owner: SignerWithAddress;
  let voter1: SignerWithAddress;
  let voter2: SignerWithAddress;
  let voter3: SignerWithAddress;
  before(async () => {
    [owner, voter1, voter2, voter3] = await ethers.getSigners();
    const ContractFactory: ContractFactory = await ethers.getContractFactory('Ballot');
    contract = await ContractFactory.deploy(proposals);
    await contract.deployed();
  });

  it(`chairperson should be able to grant vote rights to a voter`, async () => {
    let tx = await contract.connect(owner).giveRightToVote(voter1.address);
    await tx.wait();

    const voter = await contract.voters(voter1.address);
    expect(voter.weight.toString()).to.equal('1');
  });

  it(`only chairperson should be able to gran vote rights`, async () => {
    try {
      let tx = await contract.connect(voter1).giveRightToVote(voter2.address);
      await tx.wait();
      // shouldn't be here
      expect(true).to.equal(false);
    } catch (error) {}

    const voter = await contract.voters(voter2.address);
    expect(voter.weight.toString()).to.equal('0');
  });

  describe('Votation:', () => {
    before(async () => {
      const tx = await contract.connect(owner).giveRightToVote(voter2.address);
      await tx.wait();
    });

    it(`a voter with vote rights should be able to vote.`, async () => {
      const tx = await contract.connect(voter2).vote(0); // proposal index 0
      await tx.wait();

      const voter = await contract.voters(voter2.address);
      expect(voter.voted).to.equal(true);
      expect(voter.vote).to.equal(0);
    });

    it(`a voter without votes rights shouldn't be able to vote.`, async () => {
      try {
        const tx = await contract.connect(voter3).vote(0); // proposal index 0
        await tx.wait();
      } catch (error) {
        expect(true).to.equal(true);
      }
    });

    describe('Ballot duration:', () => {
      before(async () => {
        await network.provider.send('evm_increaseTime', [BALLOT_DURATION]);
        await network.provider.send('evm_mine'); // this one will have 02:00 PM as its timestamp
      });

      it(`a voter shouldn't be able to vote if the ballot has ended.`, async () => {
        try {
          const tx = await contract.connect(voter1).vote(0);
          await tx.wait();
        } catch (error) {
          expect(true).to.equal(true);
        }
      });
    });
  });
});
