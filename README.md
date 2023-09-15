## BANK CONTRACT DEPLOYED

<a href="https://goerli.etherscan.io/address/0xF872C99a7fAdC291EfDbc67CE2Cc01d3A8ef57f6#code">https://goerli.etherscan.io/address/0xF872C99a7fAdC291EfDbc67CE2Cc01d3A8ef57f6#code</a>

## TOKEN CONTRACT DEPLOYED

<a href="https://goerli.etherscan.io/address/0x0142F11F8a095917C7c7De90dCD8f927518c8c2A#code">https://goerli.etherscan.io/address/0x0142F11F8a095917C7c7De90dCD8f927518c8c2A#code</a>

## CLONE THE PROJECT

```shell
git clone https://github.com/bhavya2611/contract-seminar.git
```

## INSTALL DEPENDENCIES

Enter into the the main folder.

```shell
npm install
```

## COMPILE THE PROJECT

```shell
npm run compile
```

## RUN TESTS LOCALLY

```shell
npm run test
```

## CONFIGURE THE DEPLOYMENT

In this project, copy the .env.template file to a file named .env, and then edit it to fill in the details. Enter your Etherscan, Polygonscan API key, your Rinkeby and Matic node URL (eg from Alchemy or Infura), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

Adjust the contract deployment settings!
<b>scripts/deploy.js</b>

To get the Etherscan API key, go to
<a href="https://etherscan.io/myapikey"> https://etherscan.io/myapikey</a>

## DEPLOY ON TESTNET

```shell
npm run deploy:test
```

## DEPLOY ON MAINNET

```shell
npm run deploy:main
```
