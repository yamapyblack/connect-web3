# Connect Web3

<img width="1438" alt="connect_web3_01" src="https://user-images.githubusercontent.com/7692282/171157935-1db479d5-2b17-407b-b796-6bc344a788a3.png">

## Connect Metamask by Next.js and Redux

This repo provides a nice and easy way for connecting Metamask and storing account and network information on Redux. The repo is developed by Next.js (React.js).

The app has two pages, top page and mint page. The function of Metamask login is provided through all pages, so you don't need to serve separatedly. Also the function has "switch network" that suggest user to change correct network(chain).

<img width="315" alt="connect_web3_02" src="https://user-images.githubusercontent.com/7692282/171171938-d25e3687-2e51-4315-b302-ed0ad193fcdc.png">

The mint page is inspired by "hashlips nft minging dapp", you can develop mint page easily.
https://github.com/HashLips/hashlips_nft_minting_dapp

## Installation 🛠️

If you are cloning the project then run this first, otherwise you can download the source code on the release page and skip this step.

```
git clone https://github.com/yamapyblack/connect-web3.git
```

Make sure you have node.js installed so you can use yarn, then run:

```
yarn install
```

## Usage ℹ️

In order to make use of this dapp, all you need to do is change the configurations to point to your smart contract.

public/config/blockchainConfig.ts

```
export const networkInfo = {
  chainId: "0x250",
  chainName: "Astar Network",
  nativeCurrency: {
    name: "ASTR",
    symbol: "ASTR",
    decimals: 18,
  },
  rpcUrls: ["https://astar.api.onfinality.io/public"],
}

export const nftInfo ={
  contractAddress: "0x58b639746E3e848b837F842ADf3771CFc2FCA805",
  scanLink: "https://blockscout.com/astar/token/0x4ecAB8eb7964dDf3A50A1314fb1463372F802555",
  nftName: "FelixirNFT",
  symbol: "FLX",
  maxSupply: 4000,
  price: "100",
  marketplace: "TofuNFT",
  marketplaceLink: "https://tofunft.com/collection/felixirdao-v2/items",
}

```

The "price" is Ether. For example, if the price is 0.1Ether, you should fix 

```
price: "0.1",
```

After all the changes you can run.

```
yarn dev
```

Or create the build if you are ready to deploy.

```
yarn build
```

Now you can host the contents of the build folder on a server.

That's it! you're done.
