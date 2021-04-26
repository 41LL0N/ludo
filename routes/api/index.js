const router = require("express").Router();

const requestsPage = require('./req/index');

router.use('/req', requestsPage);

module.exports = router;