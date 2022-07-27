# FIXED BOND CONTRACT DEPLOYED

<a href="https://kovan.etherscan.io/address/0x29E07d47AEBD4da5F4d21aBDe50D672C4923F662#code">https://kovan.etherscan.io/address/0x29E07d47AEBD4da5F4d21aBDe50D672C4923F662#code</a>

# TOKEN CONTRACT DEPLOYED

<a href="https://kovan.etherscan.io/address/0x031BB2a1c7Ba20dE89b1D149C9faf1e52d084565#code">https://kovan.etherscan.io/address/0x031BB2a1c7Ba20dE89b1D149C9faf1e52d084565#code</a>

# INSTALL DEPENDENCIES

```shell
git clone https://github.com/grape404/RCB-BlockchainAus.git
```

Enter into the the main folder.

```shell
npm install
```

# RUN TEST LOCALLY

```shell
npx hardhat test
```

# CONFIGURE THE DEPLOYMENT

In this project, copy the .env.template file to a file named .env, and then edit it to fill in the details. Enter your Etherscan, Polygonscan API key, your Rinkeby and Matic node URL (eg from Alchemy or Infura), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

Adjust the contract deployment settings!
<b>scripts/deploy.js</b>

To get the Etherscan API key, go to
<a href="https://etherscan.io/myapikey"> https://etherscan.io/myapikey</a>

# DEPLOY ON TESTNET

```shell
npx hardhat run --network kovan scripts/deploy.js
```
