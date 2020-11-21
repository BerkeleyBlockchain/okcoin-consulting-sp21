const express = require('express');
const router = express.Router();
const TOKENS = require('../shared/tokens');


router.get('/all/:tokenFrom/:tokenTo', (req, res) => {

  const tokenFrom = TOKENS[req.params.tokenFrom];
  const tokenTo = TOKENS[req.params.tokenTo];

  if (tokenFrom == undefined || tokenTo == undefined) {
    // TODO: Create an error
  }

  pricing(address_1, address_2).then(result => {
    // do some processing of result into finalData
    res.json({
      uniswap: parseFloat(result[0]),
      kyber: parseFloat(result[1])
    });
  });

});

router.get('/lowest/:tokenFrom/:tokenTo', (req, res) => {

  const tokenFrom = TOKENS[req.params.tokenFrom];
  const tokenTo = TOKENS[req.params.tokenTo];

  if (tokenFrom == undefined || tokenTo == undefined) {
    // TODO: Create an error
  }

  pricing(address_1, address_2).then(result => {
    // do some processing of result into finalData
    res.json({
      uniswap: parseFloat(result[0]),
      kyber: parseFloat(result[1])
    });
  });

});

module.exports = router;
