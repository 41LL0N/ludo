const router = require("express").Router();

// ROUTING
const userCollectionPages = require("./user/index");
const apiPage = require('./api/index');

//router.use("/User", userCollectionPages);
router.use('/api/v1', apiPage);

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/home', (req, res) => {
    res.render("home");
})

router.get('/admin/new-user', (req, res) => {
    res.render("new-user");
})

module.exports = router;