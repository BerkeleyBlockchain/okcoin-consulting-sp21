
// import { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType } from '/@uniswap/sdk'
// const UNISWAP = require('@uniswap/sdk')

var App = {

  web3Provider: null,
  contracts: {},


  init: async function() {

    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (var i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();

  },

  initWeb3: async function() {
     if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:3000');
      web3 = new Web3(App.web3Provider);
    }
    web3.eth.getAccounts(function(err, accounts){
        if (err != null) console.error("An error occurred: "+err);
        else if (accounts.length == 0) console.log("User is not logged into metamask");
        else console.log("User is logged in to MetaMask");
    });

    return App.initContract();

  },

  initContract: function() {
    /*
     * Replace me...
     */

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
    App.uniswapTrade()

    /*
     * Replace me...
     */
  },

  uniswapTrade: async function() {

    const {ParaSwap} = require("paraswap");
    const paraswap = new ParaSwap();

    // Replace this with ES6 import later

    const ChainId = UNISWAP.ChainId;
    const Token = UNISWAP.Token;
    const WETH = UNISWAP.Fetcher;
    const Trade = UNISWAP.Trade;
    const Route = UNISWAP.Route;
    const TokenAmount = UNISWAP.TokenAmount;
    const TradeType = UNISWAP.TradeType;

    // console.log(`The chainId of mainnet is ${UNISWAP.ChainId.MAINNET}.`)


    const DAI = new Token(ChainId.ROPSTEN, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

    // note that you may want/need to handle this async code differently,
    // for example if top-level await is not an option
    const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

    const route = new Route([pair], WETH[DAI.chainId])

    const amountIn = '500000000000000000' // 0.5 WETH

    const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], amountIn), TradeType.EXACT_INPUT)


    const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%

    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw // needs to be converted to e.g. hex
    const path = [WETH[DAI.chainId].address, DAI.address]
    const to = web3.currentProvider.selectedAddress
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
    const amount = trade.inputAmount.raw // // needs to be converted to e.g. hex

    var Contract = require('web3-eth-contract');
    // set provider for all later instances to use Contract.setProvider('ws://localhost:8546');
    var router = new Contract(IUniswapV2Router02, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");


    swapExactETHForTokens(amountOutMin, path, to, deadline, {value: amount});

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
