# OKCoin DEX Aggregator

Setting up and running the DEX aggregator interface

### Setup

Make sure you are using Node LTS (14.x as of 2/20/21), not Beta (15.x as of 2/20/21)

```
git clone https://github.com/BerkeleyBlockchain/okcoin-consulting.git
cd okcoin-consulting
npm install
```

### Running the Aggregator

```
npm start
```

This should open a browser to the dev server at `http://localhost:3000`.

Connect the desired account in MetaMask to use the aggregator.

Requires a .env file in the project root with the following contents:

```
REACT_APP_ONBOARD_DAPPID=XXXXXXXXXXXXXXXXXXXX
REACT_APP_ONBOARD_NETWORKID_PROD=1
REACT_APP_ONBOARD_NETWORKID_DEV=42

REACT_APP_ZEROEX_PROD=https://api.0x.org
REACT_APP_ZEROEX_DEV=https://kovan.api.0x.org
 ```
