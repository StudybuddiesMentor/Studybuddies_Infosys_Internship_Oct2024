const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Protected content');
});

module.exports = router;