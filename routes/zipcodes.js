'use strict';

let express = require('express');

let router = express.Router();
let request = require('request');


router.post('/', (req, res) => {
  console.log('req.body.city: ',req.body.city);
  console.log('req.body.state: ',req.body.state);
  console.log('req.body.keyword: ',req.body.keyword);
	request(`https://us-zipcode.api.smartystreets.com/lookup?auth-id=2153847c-f0f0-26cc-9c97-5196c0a9a054&auth-token=SIvg0L5H3Dls7qyATMFd&city=${req.body.city}&state=${req.body.state}`, function(err, response, body) {
		if(err) return res.status(400).send(err);
		// res.send(body);
		// res.send(JSON.parse(body)[0].zipcodes[0].zipcode);
    let zipcode = JSON.parse(body)[0].zipcodes[0].zipcode;
    console.log("zipcode: ", zipcode);
      request(`https://us.api.iheart.com/api/v2/content/liveStations?countryCode=US&limit=10000&zipCode=${zipcode}&keywords=${req.body.keyword}`, function(err, response, body) {
        if(err) return res.status(400).send(err);
        res.send(JSON.parse(body).hits[0].streams.hls_stream);
      })

	})
})



module.exports = router;
