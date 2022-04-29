import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ContractReceipt } from 'ethers';
import { ethers } from 'hardhat';

const { utils } = ethers;

const proposals: string[] = [
  utils.formatBytes32String('Proposal 1'),
  utils.formatBytes32String('Proposal 2'),
  utils.formatBytes32String('Proposal 3'),
];

async function main() {
  const [owner, voter1, voter2] = await ethers.getSigners();
  const ContractFactory = await ethers.getContractFactory('Ballot');

  console.log('Deploying ballot contract...');

  const contract = await ContractFactory.connect(owner).deploy(proposals);

  async function giveRightToVote(voter: SignerWithAddress): Promise<ContractReceipt> {
    const tx = await contract.connect(owner).giveRightToVote(voter.address);
    const receipt = await tx.wait();
    return receipt;
  }

  async function vote(voter: SignerWithAddress, proposal: number): Promise<ContractReceipt> {
    const tx = await contract.connect(voter).vote(proposal);
    const receipt = await tx.wait();
    return receipt;
  }

  await contract.deployed();

  console.log('Ballot deployed to:', contract.address);

  console.log('Giving vote rights to voters...');
  await Promise.all([giveRightToVote(voter1), giveRightToVote(voter2)]);

  console.log('Adding voter1 vote...');
  await vote(voter1, 0);

  console.log('Waiting until the ballot ends...');
  await new Promise((resolve) => setTimeout(resolve, 1000 * 60 * 5));

  console.log('Adding voter2 vote. It should fail...');
  try {
    await vote(voter1, 0);
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
