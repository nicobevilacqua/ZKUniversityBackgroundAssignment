# Zero Knowledge University Background Assignment

## A. Conceptual Knowledge

1. *What is a smart contract? How are they deployed? You should be able to describe how a smart contract is deployed and the necessary steps.*

- **YOUR ANSWER HERE**

2. *What is gas? Why is gas optimization such a big focus when building smart contracts?*

- **YOUR ANSWER HERE**

3. *What is a hash? Why do people use hashing to hide information?*

- **YOUR ANSWER HERE**

4. *How would you prove to a colorblind person that two different colored objects are actually of different colors? You could check out Avi Wigderson talk about a similar problem [here](https://www.youtube.com/watch?v=5ovdoxnfFVc&t=4s).*

- **YOUR ANSWER HERE**


## B. **You sure you’re solid with Solidity?**

1. *Program a super simple “Hello World” smart contract: write a `**storeNumber**` function to store an unsigned integer and then a `**retrieveNumber**` function to retrieve it. Clearly comment your code. Once completed, deploy the smart contract on [remix](http://remix.ethereum.org/). Push the .sol file to Github or Gist and include a screenshot of the Remix UI once deployed in your final submission pdf.*

- **[Contract code can be found here](./contracts/HelloWorld.sol)**
- **[Test code can be found here](./test/HelloWorld.test.ts)**
- **[Deployment script code can be found here](./scripts/deploy-HelloWorld.ts)**

### Screenshots

<img width="1360" alt="image" src="screenshots/HelloWorld-remix-deployment.png">

2. *On the documentation page, [the “Ballot” contract](https://docs.soliditylang.org/en/v0.8.11/solidity-by-example.html#voting) demonstrates a lot of features on Solidity. Read through the script and try to understand what each line of code is doing.*

3. *Suppose we want to limit the voting period of each Ballot contract to **5 minutes**. To do so, implement the following: Add a state variable **`startTime`** to record the voting start time. Create a [modifier](https://www.youtube.com/watch?v=b6FBWsz7VaI) **`voteEnded`** that will check if the voting period is over. Use that modifier in the `**vote**` function to forbid voting and revert the transaction after the deadline.*

- **[Contract code can be found here](./contracts/Ballot.sol)**
- **[Test code can be found here](./test/Ballot.test.ts)**

4. *Deploy your amended script and test the newly implemented functionality in part 3. Submit (1) your amended version of the contract on Github or Gist and (2) screenshots showing the time of contract deployment as well as the transaction being reverted once past the voting period.*

- **[Deploy script can be found here](./contracts/Ballot.sol)**
- **[Test script can be found here](./contracts/Ballot.sol)**

#### Screenshots:
TODO