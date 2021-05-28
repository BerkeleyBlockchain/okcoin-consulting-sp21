# OKCoin DEX Aggregator Developer Docs

Authors (Github): @sehyunc, @yuzhoumo

## Setup Instructions

```
git clone https://github.com/BerkeleyBlockchain/okcoin-consulting.git
cd okcoin-consulting
yarn install
```

Requires a `.env` file in the project root with the following contents:

```
REACT_APP_ENV=production
REACT_APP_ONBOARD_DAPPID=XXXXXXXXXXXXXXXXXXXX
REACT_APP_ONBOARD_NETWORKID_PROD=1
REACT_APP_ONBOARD_NETWORKID_DEV=42

REACT_APP_ZEROEX_PROD=https://api.0x.org
REACT_APP_ZEROEX_DEV=https://kovan.api.0x.org
```

**Running in developer mode:**

1. Make sure `REACT_APP_ENV` is set to `development` and run `yarn start`

2. This should open a browser to the dev server at `http://localhost:3000`. This runs a dev environment on the Kovan
   testnet and has a limited set of tokens.

**Building for production:**

1. Make sure `REACT_APP_ENV` is set to `production`

2. Run the following commands:

```
yarn build
yarn global add serve
serve -s build
```

This builds a fully featured version for Mainnet and serves it locally.

## Testing on Kovan

- Running the application in developer mode launches it on Kovan
- Test ETH is available from the Kovan faucet at https://faucet.kovan.network/
- Note: Kovan routes swaps only through Uniswap due to limitations with the 0x API

## Testing on MainNet Fork

**Forking Mainnet:**

1. Get the latest block number from https://etherscan.io/blocks
2. Use `ganache-cli` to fork the Mainnet using the following command:

```
ganache-cli -i 1 --fork https://mainnet.infura.io/v3/72bad8d7710242c193209a2e7ddc19bc@BLOCK_NUMBER
```

Replace `BLOCK_NUMBER` with the latest block number. The `-i 1` flag sets the network ID to 1 (MAINNET) so that
the application will not prompt the user to switch networks.

3. Choose any of the private keys provided by `ganache-cli` to get an account with 100 test ETH

**Using Mainnet fork with MetaMask:**

1. Select **Localhost 8545** as your network in MetaMask to us our forked network.
2. Select **Import Account** in the accounts menu.
3. Paste in a private key provided by `ganache-cli`
4. You should now see an account with 100 test ETH in MetaMask.

**IMPORTANT INFORMATION:**

The fork you made is temporary. That means when you quit ganache, you'll lose all the information you just created.
You have to run through all the above steps and re-import a new private key the next time you run `ganache-cli`.

There is also an issue with MetaMask caching. If you get any error messages regarding incorrect nonce values, you need
to reset your account by doing **Settings > Advanced > Reset Account**. This will delete any transaction history recorded
by MetaMask. There may also be other issues with swaps due to limitations of forking the mainnet with ganache.

## Tested Features

**Swap**

- Swap from ETH to ERC20 and ERC20 to ETH
- Swap from ERC20 to ERC20
- Price

**Wallet**

- Connect to wallet
- Change wallet
- Change wallet network
- Lock wallet
- Disconnect wallet
- Wallet balance updates

**Information**

- Shows accurate rate
- Shows accurate source
- Shows accurate gas price
- Shows relatively accurate gas price estimate
