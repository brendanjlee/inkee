let express = require('express');
let router = express.Router();
// TODO: let v1 = require('./versions/v1.0/');

router.use('/v1', v1);

module.exports = router;
