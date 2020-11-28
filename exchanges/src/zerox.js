var Web3 = require("web3");
var fetch = require("node-fetch");

const web3 = new Web3(
    new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/b2e13b0a648e4c67b4a36951f5b1ed62")
  ); 

const params = {
    buyToken: "DAI",
    sellToken: "USDC",
    buyAmount: "100000000000000"
}

await fetch(
    `https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=WETH&sellAmount=100000000000000000`
).then((res) => {
    console.log(res.json());
    }
);

