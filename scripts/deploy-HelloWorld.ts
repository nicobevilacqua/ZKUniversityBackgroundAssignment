import { ethers } from 'hardhat';

async function main() {
  const ContractFactory = await ethers.getContractFactory('HelloWorld');
  const contract = await ContractFactory.deploy();

  await contract.deployed();

  console.log('HelloWorld deployed to:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
