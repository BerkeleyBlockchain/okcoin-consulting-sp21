const express = require('express');
const router = express.Router();
const TOKENS = require('../shared/tokens');


router.get('/:tokenFrom/:tokenTo', (req, res) => {

  const tokenFrom = TOKENS[req.params.tokenFrom];
  const tokenTo = TOKENS[req.params.tokenTo];

  if (tokenFrom == undefined || tokenTo == undefined) {
    // TODO: Create an error
  }

  

});

module.exports = router;
