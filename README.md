# OKCoin DEX Aggregator

Setting up and running the DEX aggregator interface

### Setup

```
git clone https://github.com/BerkeleyBlockchain/okcoin-consulting.git
cd okcoin-consulting
yarn install
```

Requires a .env file in the project root with the following contents:

```
REACT_APP_ONBOARD_DAPPID=XXXXXXXXXXXXXXXXXXXX
REACT_APP_ONBOARD_NETWORKID_PROD=1
REACT_APP_ONBOARD_NETWORKID_DEV=42

REACT_APP_ZEROEX_PROD=https://api.0x.org
REACT_APP_ZEROEX_DEV=https://kovan.api.0x.org
```

### Running the Aggregator in Developer Mode

```
yarn start
```

This should open a browser to the dev server at `http://localhost:3000`.

This will run a dev environment on the Kovan testnet and has limited tokens and features.

### Running the Aggregator in Production Mode

```
yarn build
yarn global add serve
serve -s build
```

This builds a fully featured version for Mainnet and serves it locally.
