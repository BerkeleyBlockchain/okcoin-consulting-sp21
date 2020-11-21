# Pricing Backend Design Document

Backend Structure:
```
src
├── exchanges
│   ├── index.js
│   ├── kyber.js
│   ├── uniswap.js
│   └── zero-x.js
├── routes
│   └── pricing.js
├── shared
│   └── tokens.js
└── app.js
```

## Exchanges

`index.js` should contain aggregation functions and exports for all of the supported exchanges

All js files in the exchanges directory should implement the following API:

```
getPrice(tokenFrom, tokenTo)
    returns a json object with midprice and inverse fields for the midprice of the token pair and the inverse
    (inverse being the midprice for OUTPUT -> INPUT)
    input parameters are json token objects defined in shared/token.js

getData(tokenFrom, tokenTo, ...etc) <- parameters subject to change depending on what we need
    returns a json object (different depending on each exchange)
    should supply enough info to the frontend necessary to carry out the trade
    supplies the parameters for the smart contract call of that exchange
```

## Routes

The exchange folder contains the code for the pricing aggregation. The routes should call those
functions and handle http requests.

`pricing.js`: handles pricing data for exchanges

`data.js`: handles trade data for exchanges (returns the trade data necessary to perform the trade)

## Shared

The shared folder contains information shared accross the other backend files.

`tokens.js` contains information about the supported tokens. Each token in the file is a json
object with the following fields:

* mainnet: the mainnet contract address of the token
* ropsten: the ropsten contract address of the token for testing purposes
* ticker: the ticker of the token ("ETH", "USDC", etc.)
* decimals: the number of decimals for that token (the decimals of the smallest unit)
