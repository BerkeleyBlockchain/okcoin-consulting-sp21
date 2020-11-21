var fetch = require("node-fetch");

async function getMidprice(fromTokenAddress, toTokenAddress) {

  let ratesRequest = await fetch(
    "https://api.kyber.network/sell_rate?id=" +
      fromTokenAddress +
      "&qty=1"
  );

  // Parsing the output
  let rates = await ratesRequest.json();

  // Getting the source quantity
  let input_in_eth = rates.data[0].dst_qty;

  let ratesRequest_2 = await fetch(
    "https://api.kyber.network/buy_rate?id=" +
      toTokenAddress +
      "&qty=1"
  );

  // Parsing the output
  let rates_2 = await ratesRequest_2.json();

  // Getting the source quantity
  let output_in_eth = rates_2.data[0].src_qty;

  return input_in_eth/output_in_eth;

};

module.exports = app;
