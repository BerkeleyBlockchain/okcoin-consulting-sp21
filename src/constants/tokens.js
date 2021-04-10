const tokensTestnet = {
  data: {
    DAI: {
      symbol: 'DAI',
      address: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
      name: 'Dai Stablecoin',
      decimals: 18,
    },
    REP: {
      symbol: 'REP',
      address: '0x4e5cb5a0caca30d1ad27d8cd8200a907854fb518',
      name: 'Augur Reputation',
      decimals: 18,
    },
    ETH: {
      symbol: 'ETH',
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      name: 'Ether',
      decimals: 18,
    },
    WETH: {
      symbol: 'WETH',
      address: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
      name: 'Wrapped Ether',
      decimals: 18,
    },
    ZRX: {
      symbol: 'ZRX',
      address: '0x2002d3812f58e35f0ea1ffbf80a75a38c32175fa',
      name: '0x Protocol Token',
      decimals: 18,
    },
    USDC: {
      symbol: 'USDC',
      address: '0x75b0622cec14130172eae9cf166b92e5c112faff',
      name: 'USD Coin',
      decimals: 6,
    },
    BAT: {
      symbol: 'BAT',
      address: '0x9f8cfb61d3b2af62864408dd703f9c3beb55dff7',
      name: 'Basic Attention Token',
      decimals: 18,
    },
    MKR: {
      symbol: 'MKR',
      address: '0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd',
      name: 'Maker',
      decimals: 18,
    },
    WBTC: {
      symbol: 'WBTC',
      address: '0xa0a5ad2296b38bd3e3eb59aaeaf1589e8d9a29a9',
      name: 'Wrapped BTC',
      decimals: 8,
    },
    KNC: {
      symbol: 'KNC',
      address: '0xad67cb4d63c9da94aca37fdf2761aadf780ff4a2',
      name: 'Kyber Network Crystal',
      decimals: 18,
    },
    SAI: {
      symbol: 'SAI',
      address: '0xc4375b7de8af5a38a93548eb8453a498222c4ff2',
      name: 'Sai Stablecoin v1.0',
      decimals: 18,
    },
    cREP: {
      symbol: 'cREP',
      address: '0xfd874be7e6733bdc6dca9c7cdd97c225ec235d39',
      name: 'Compound Augur',
      decimals: 8,
    },
    cZRX: {
      symbol: 'cZRX',
      address: '0xc014dc10a57ac78350c5fddb26bb66f1cb0960a0',
      name: 'Compound 0x',
      decimals: 8,
    },
    ZWETH: {
      symbol: 'ZWETH',
      address: '0x1FcAf05ABa8c7062D6F08E25c77Bf3746fCe5433',
      name: 'Custom Kovan Wrapped Ether',
      decimals: 18,
    },
    ZUSDC: {
      symbol: 'ZUSDC',
      address: '0x5a719Cf3E02c17c876F6d294aDb5CB7C6eB47e2F',
      name: 'Custom Kovan USD Coin',
      decimals: 6,
    },
  },
  tokens: [
    'ETH',
    'BAT',
    'DAI',
    'KNC',
    'MKR',
    'REP',
    'SAI',
    'USDC',
    'WBTC',
    'WETH',
    'ZRX',
    'ZUSDC',
    'ZWETH',
    'cREP',
    'cZRX',
  ],
};

const tokensMainnet = {
  data: {
    ETH: {
      symbol: 'ETH',
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      name: 'Ether',
      decimals: 18,
    },
    WETH: {
      symbol: 'WETH',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      name: 'Wrapped Ether',
      decimals: 18,
    },
    ZRX: {
      symbol: 'ZRX',
      address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
      name: '0x Protocol Token',
      decimals: 18,
    },
    DAI: {
      symbol: 'DAI',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      name: 'Dai Stablecoin',
      decimals: 18,
    },
    USDC: {
      symbol: 'USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      name: 'USD Coin',
      decimals: 6,
    },
    USDT: {
      symbol: 'USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      name: 'Tether USD',
      decimals: 6,
    },
    WBTC: {
      symbol: 'WBTC',
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      name: 'Wrapped BTC',
      decimals: 8,
    },
    UNI: {
      symbol: 'UNI',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      name: 'Uniswap Protocol Governance Token',
      decimals: 18,
    },
    MKR: {
      symbol: 'MKR',
      address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
      name: 'Maker',
      decimals: 18,
    },
    SNX: {
      symbol: 'SNX',
      address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
      name: 'Synthetix Network Token',
      decimals: 18,
    },
    LINK: {
      symbol: 'LINK',
      address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      name: 'Chainlink Token',
      decimals: 18,
    },
    SUSD: {
      symbol: 'SUSD',
      address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
      name: 'sUSD',
      decimals: 18,
    },
    TUSD: {
      symbol: 'TUSD',
      address: '0x0000000000085d4780B73119b644AE5ecd22b376',
      name: 'TrueUSD',
      decimals: 18,
    },
    SUSHI: {
      symbol: 'SUSHI',
      address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
      name: 'Sushi',
      decimals: 18,
    },
    AAVE: {
      symbol: 'AAVE',
      address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
      name: 'Aave',
      decimals: 18,
    },
    YFI: {
      symbol: 'YFI',
      address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
      name: 'yearn.finance',
      decimals: 18,
    },
    BAT: {
      symbol: 'BAT',
      address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
      name: 'Basic Attention Token',
      decimals: 18,
    },
    KNC: {
      symbol: 'KNC',
      address: '0xdd974D5C2e2928deA5F71b9825b8b646686BD200',
      name: 'Kyber Network Crystal',
      decimals: 18,
    },
    BNT: {
      symbol: 'BNT',
      address: '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C',
      name: 'Bancor Network Token',
      decimals: 18,
    },
    BAL: {
      symbol: 'BAL',
      address: '0xba100000625a3754423978a60c9317c58a424e3D',
      name: 'Balancer',
      decimals: 18,
    },
    COMP: {
      symbol: 'COMP',
      address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
      name: 'Compound',
      decimals: 18,
    },
    GNO: {
      symbol: 'GNO',
      address: '0x6810e776880C02933D47DB1b9fc05908e5386b96',
      name: 'Gnosis Token',
      decimals: 18,
    },
    REN: {
      symbol: 'REN',
      address: '0x408e41876cCCDC0F92210600ef50372656052a38',
      name: 'Republic Protocol',
      decimals: 18,
    },
    GNT: {
      symbol: 'GNT',
      address: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
      name: 'Golem Network Token',
      decimals: 18,
    },
    OMG: {
      symbol: 'OMG',
      address: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
      name: 'OmiseGO',
      decimals: 18,
    },
    ANT: {
      symbol: 'ANT',
      address: '0x960b236A07cf122663c4303350609A66A7B288C0',
      name: 'Aragon Network Token',
      decimals: 18,
    },
    SAI: {
      symbol: 'SAI',
      address: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
      name: 'Sai Stablecoin v1.0',
      decimals: 18,
    },
    DTH: {
      symbol: 'DTH',
      address: '0x5adc961D6AC3f7062D2eA45FEFB8D8167d44b190',
      name: 'Dether',
      decimals: 18,
    },
    FOAM: {
      symbol: 'FOAM',
      address: '0x4946Fcea7C692606e8908002e55A582af44AC121',
      name: 'FOAM',
      decimals: 18,
    },
    AST: {
      symbol: 'AST',
      address: '0x27054b13b1B798B345b591a4d22e6562d47eA75a',
      name: 'AirSwap Token',
      decimals: 4,
    },
    AION: {
      symbol: 'AION',
      address: '0x4CEdA7906a5Ed2179785Cd3A40A69ee8bc99C466',
      name: 'Aion Network',
      decimals: 8,
    },
    GEN: {
      symbol: 'GEN',
      address: '0x543Ff227F64Aa17eA132Bf9886cAb5DB55DCAddf',
      name: 'DAOstack',
      decimals: 18,
    },
    STORJ: {
      symbol: 'STORJ',
      address: '0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC',
      name: 'Storj',
      decimals: 8,
    },
    MANA: {
      symbol: 'MANA',
      address: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
      name: 'Decentraland',
      decimals: 18,
    },
    ENTRP: {
      symbol: 'ENTRP',
      address: '0x5BC7e5f0Ab8b2E10D2D0a3F21739FCe62459aeF3',
      name: 'Hut34 Entropy Token',
      decimals: 18,
    },
    MLN: {
      symbol: 'MLN',
      address: '0xBEB9eF514a379B997e0798FDcC901Ee474B6D9A1',
      name: 'Melon',
      decimals: 18,
    },
    LOOM: {
      symbol: 'LOOM',
      address: '0xA4e8C3Ec456107eA67d3075bF9e3DF3A75823DB0',
      name: 'Loom Network Token',
      decimals: 18,
    },
    RLC: {
      symbol: 'RLC',
      address: '0x607F4C5BB672230e8672085532f7e901544a7375',
      name: 'iExec RLC Token',
      decimals: 9,
    },
    ICN: {
      symbol: 'ICN',
      address: '0x888666CA69E0f178DED6D75b5726Cee99A87D698',
      name: 'ICONOMI',
      decimals: 18,
    },
    DGD: {
      symbol: 'DGD',
      address: '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A',
      name: 'Digix',
      decimals: 9,
    },
    ZIL: {
      symbol: 'ZIL',
      address: '0x05f4a42e251f2d52b8ed15E9FEdAacFcEF1FAD27',
      name: 'Zilliqa',
      decimals: 12,
    },
    cBAT: {
      symbol: 'cBAT',
      address: '0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E',
      name: 'Compound Basic Attention Token',
      decimals: 8,
    },
    cDAI: {
      symbol: 'cDAI',
      address: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
      name: 'Compound Dai',
      decimals: 8,
    },
    cSAI: {
      symbol: 'cSAI',
      address: '0xF5DCe57282A584D2746FaF1593d3121Fcac444dC',
      name: 'Compound Sai (Legacy Dai)',
      decimals: 8,
    },
    cETH: {
      symbol: 'cETH',
      address: '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5',
      name: 'Compound Ether',
      decimals: 8,
    },
    cREP: {
      symbol: 'cREP',
      address: '0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1',
      name: 'Compound Augur',
      decimals: 8,
    },
    cUSDC: {
      symbol: 'cUSDC',
      address: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
      name: 'Compound USD Coin',
      decimals: 8,
    },
    cZRX: {
      symbol: 'cZRX',
      address: '0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407',
      name: 'Compound 0x',
      decimals: 8,
    },
    '0xBTC': {
      symbol: '0xBTC',
      address: '0xB6eD7644C69416d67B522e20bC294A9a9B405B31',
      name: '0xBitcoin Token',
      decimals: 8,
    },
    SNT: {
      symbol: 'SNT',
      address: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
      name: 'Status Network Token',
      decimals: 18,
    },
    SPANK: {
      symbol: 'SPANK',
      address: '0x42d6622deCe394b54999Fbd73D108123806f6a18',
      name: 'SPANK',
      decimals: 18,
    },
    BOOTY: {
      symbol: 'BOOTY',
      address: '0x6B01c3170ae1EFEBEe1a3159172CB3F7A5ECf9E5',
      name: 'BOOTY',
      decimals: 18,
    },
    UBT: {
      symbol: 'UBT',
      address: '0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e',
      name: 'UniBright',
      decimals: 8,
    },
    NMR: {
      symbol: 'NMR',
      address: '0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671',
      name: 'Numeraire',
      decimals: 18,
    },
    GUSD: {
      symbol: 'GUSD',
      address: '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd',
      name: 'Gemini Dollar',
      decimals: 2,
    },
    FUN: {
      symbol: 'FUN',
      address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      name: 'FunFair',
      decimals: 8,
    },
    PAX: {
      symbol: 'PAX',
      address: '0x8E870D67F660D95d5be530380D0eC0bd388289E1',
      name: 'PAX Stablecoin',
      decimals: 18,
    },
    LPT: {
      symbol: 'LPT',
      address: '0x58b6A8A3302369DAEc383334672404Ee733aB239',
      name: 'Livepeer',
      decimals: 18,
    },
    ENJ: {
      symbol: 'ENJ',
      address: '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c',
      name: 'EnjinCoin',
      decimals: 18,
    },
    POWR: {
      symbol: 'POWR',
      address: '0x595832F8FC6BF59c85C527fEC3740A1b7a361269',
      name: 'PowerLedger',
      decimals: 6,
    },
    REQ: {
      symbol: 'REQ',
      address: '0x8f8221aFbB33998d8584A2B05749bA73c37a938a',
      name: 'Request',
      decimals: 18,
    },
    DNT: {
      symbol: 'DNT',
      address: '0x0AbdAce70D3790235af448C88547603b945604ea',
      name: 'district0x',
      decimals: 18,
    },
    MATIC: {
      symbol: 'MATIC',
      address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
      name: 'Matic Network Token',
      decimals: 18,
    },
    LRC: {
      symbol: 'LRC',
      address: '0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD',
      name: 'Loopring',
      decimals: 18,
    },
    RDN: {
      symbol: 'RDN',
      address: '0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6',
      name: 'Raiden Network Token',
      decimals: 18,
    },
    GST2: {
      symbol: 'GST2',
      address: '0x0000000000b3F879cb30FE243b4Dfee438691c04',
      name: 'Gas Token 2',
      decimals: 2,
    },
    UMA: {
      symbol: 'UMA',
      address: '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828',
      name: 'Universal Market Access',
      decimals: 18,
    },
    BZRX: {
      symbol: 'BZRX',
      address: '0x56d811088235F11C8920698a204A5010a788f4b3',
      name: 'bZx Protocol Token',
      decimals: 18,
    },
    renBTC: {
      symbol: 'renBTC',
      address: '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
      name: 'renBTC',
      decimals: 8,
    },
    LEND: {
      symbol: 'LEND',
      address: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
      name: 'Aave',
      decimals: 18,
    },
    AMPL: {
      symbol: 'AMPL',
      address: '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
      name: 'Ampleforth',
      decimals: 9,
    },
    KEEP: {
      symbol: 'KEEP',
      address: '0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC',
      name: 'Keep',
      decimals: 18,
    },
    mUSD: {
      symbol: 'mUSD',
      address: '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
      name: 'mStable USD',
      decimals: 18,
    },
    bUSD: {
      symbol: 'bUSD',
      address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
      name: 'Binance USD',
      decimals: 18,
    },
    CRV: {
      symbol: 'CRV',
      address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
      name: 'Curve DAO Token',
      decimals: 18,
    },
    SWRV: {
      symbol: 'SWRV',
      address: '0xB8BAa0e4287890a5F79863aB62b7F175ceCbD433',
      name: 'Swerve DAO Token',
      decimals: 18,
    },
    sBTC: {
      symbol: 'sBTC',
      address: '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6',
      name: 'Synth sBTC',
      decimals: 18,
    },
    yUSD: {
      symbol: 'yUSD',
      address: '0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c',
      name: 'yearn Curve.fi yDAI/yUSDC/yUSDT/yTUSD',
      decimals: 18,
    },
    ybCRV: {
      symbol: 'ybCRV',
      address: '0x2994529C0652D127b7842094103715ec5299bBed',
      name: 'yearn Curve.fi yDAI/yUSDC/yUSDT/yBUSD',
      decimals: 18,
    },
    yUSDC: {
      symbol: 'yUSDC',
      address: '0x597aD1e0c13Bfe8025993D9e79C69E1c0233522e',
      name: 'yearn USDC',
      decimals: 18,
    },
    yDAI: {
      symbol: 'yDAI',
      address: '0xACd43E627e64355f1861cEC6d3a6688B31a6F952',
      name: 'yearn DAI',
      decimals: 18,
    },
    yUSDT: {
      symbol: 'yUSDT',
      address: '0x2f08119C6f07c006695E079AAFc638b8789FAf18',
      name: 'yearn USDT',
      decimals: 18,
    },
    yTUSD: {
      symbol: 'yTUSD',
      address: '0x37d19d1c4E1fa9DC47bD1eA12f742a0887eDa74a',
      name: 'yearn TUSD',
      decimals: 18,
    },
    AKRO: {
      symbol: 'AKRO',
      address: '0x8Ab7404063Ec4DBcfd4598215992DC3F8EC853d7',
      name: 'Akropolis',
      decimals: 18,
    },
    AUDIO: {
      symbol: 'AUDIO',
      address: '0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998',
      name: 'Audius',
      decimals: 18,
    },
    BAND: {
      symbol: 'BAND',
      address: '0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55',
      name: 'Band Protocol',
      decimals: 18,
    },
    BASED: {
      symbol: 'BASED',
      address: '0x68A118Ef45063051Eac49c7e647CE5Ace48a68a5',
      name: 'Based Money',
      decimals: 18,
    },
    BUSD: {
      symbol: 'BUSD',
      address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
      name: 'Binance USD',
      decimals: 18,
    },
    CREAM: {
      symbol: 'CREAM',
      address: '0x2ba592F78dB6436527729929AAf6c908497cB200',
      name: 'Cream',
      decimals: 18,
    },
    MTA: {
      symbol: 'MTA',
      address: '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2',
      name: 'Meta',
      decimals: 18,
    },
    PAXG: {
      symbol: 'PAXG',
      address: '0x45804880De22913dAFE09f4980848ECE6EcbAf78',
      name: 'PAX Gold',
      decimals: 18,
    },
    PICKLE: {
      symbol: 'PICKLE',
      address: '0x429881672B9AE42b8EbA0E26cD9C73711b891Ca5',
      name: 'Pickle Finance',
      decimals: 18,
    },
    RENZEC: {
      symbol: 'RENZEC',
      address: '0x1C5db575E2Ff833E46a2E9864C22F4B22E0B37C2',
      name: 'renZEC',
      decimals: 8,
    },
    REP: {
      symbol: 'REP',
      address: '0x221657776846890989a759BA2973e427DfF5C9bB',
      name: 'Augur',
      decimals: 18,
    },
    SETH: {
      symbol: 'SETH',
      address: '0x5e74C9036fb86BD7eCdcb084a0673EFc32eA31cb',
      name: 'sETH',
      decimals: 18,
    },
    STAKE: {
      symbol: 'STAKE',
      address: '0x0Ae055097C6d159879521C384F1D2123D1f195e6',
      name: 'xDAI Stake',
      decimals: 18,
    },
    TBTC: {
      symbol: 'TBTC',
      address: '0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa',
      name: 'tBTC',
      decimals: 18,
    },
    '1INCH': {
      symbol: '1INCH',
      address: '0x111111111117dC0aa78b770fA6A738034120C302',
      name: '1INCH',
      decimals: 18,
    },
  },
  tokens: [
    'ETH',
    'WETH',
    'DAI',
    'USDC',
    'USDT',
    'WBTC',
    '0xBTC',
    '1INCH',
    'AAVE',
    'AION',
    'AKRO',
    'AMPL',
    'ANT',
    'AST',
    'AUDIO',
    'BAL',
    'BAND',
    'BASED',
    'BAT',
    'BNT',
    'BOOTY',
    'BUSD',
    'BZRX',
    'COMP',
    'CREAM',
    'CRV',
    'DGD',
    'DNT',
    'DTH',
    'ENJ',
    'ENTRP',
    'FOAM',
    'FUN',
    'GEN',
    'GNO',
    'GNT',
    'GST2',
    'GUSD',
    'ICN',
    'KEEP',
    'KNC',
    'LEND',
    'LINK',
    'LOOM',
    'LPT',
    'LRC',
    'MANA',
    'MATIC',
    'MKR',
    'MLN',
    'MTA',
    'NMR',
    'OMG',
    'PAX',
    'PAXG',
    'PICKLE',
    'POWR',
    'RDN',
    'REN',
    'RENZEC',
    'REP',
    'REQ',
    'RLC',
    'SAI',
    'SETH',
    'SNT',
    'SNX',
    'SPANK',
    'STAKE',
    'STORJ',
    'SUSD',
    'SUSHI',
    'SWRV',
    'TBTC',
    'TUSD',
    'UBT',
    'UMA',
    'UNI',
    'YFI',
    'ZIL',
    'ZRX',
    'bUSD',
    'cBAT',
    'cDAI',
    'cETH',
    'cREP',
    'cSAI',
    'cUSDC',
    'cZRX',
    'mUSD',
    'renBTC',
    'sBTC',
    'yDAI',
    'yTUSD',
    'yUSD',
    'yUSDC',
    'yUSDT',
    'ybCRV',
  ],
};

export default process.env.REACT_APP_ENV === 'production' ? tokensMainnet : tokensTestnet;
