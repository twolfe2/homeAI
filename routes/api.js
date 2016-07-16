'use strict';


const express = require('express');



let router = express.Router();


router.use('/cruds', require('./cruds'))
router.use('/zipcodes', require('./zipcodes'))




module.exports = router;
