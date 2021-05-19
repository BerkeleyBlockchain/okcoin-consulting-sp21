const express = require('express');
const router = express.Router();

const EXCHANGES = require('../exchanges');
const TOKENS = require('../shared/tokens');

/**
 * Get midprice from all exchanges. tokenFrom and tokenTo
 * should be valid tickers defined in shared/tokens.js
 */
router.get('/:tokenFrom/:tokenTo', (req, res) => {
  const tokenFrom = TOKENS[req.params.tokenFrom];
  const tokenTo = TOKENS[req.params.tokenTo];

  if (tokenFrom == undefined || tokenTo == undefined) {
    res.json({ error: 'UNDEFINED TOKENS' });
  }

  EXCHANGES.getAllPrices(tokenFrom, tokenTo).then((result) => {
    res.json(result);
  });
});

/**
 * Get lowest midprice from all exchanges. tokenFrom and
 * tokenTo should be valid tickers defined in shared/tokens.js
 */
router.get('/lowest/:tokenFrom/:tokenTo', (req, res) => {
  const tokenFrom = TOKENS[req.params.tokenFrom];
  const tokenTo = TOKENS[req.params.tokenTo];

  if (tokenFrom == undefined || tokenTo == undefined) {
    res.json({ error: 'UNDEFINED TOKENS' });
  }

  EXCHANGES.getLowestPrice(tokenFrom, tokenTo).then((result) => {
    res.json(result);
  });
});

module.exports = router;
