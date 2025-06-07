const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', async (req, res) => {
  request('https://api.thecatapi.com/v1/images/search', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      res.json(data);
    } else {
      res.status(500).send('Failed to fetch cat image');
    }
  });
});

module.exports = router;
