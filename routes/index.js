const router = require("express").Router();
const User = require("../public/models/User");

// ROUTING
const userCollectionPages = require("./user/index");
const apiPage = require('./api/index');

//router.use("/User", userCollectionPages);
router.use('/api/v1', apiPage);

router.get('/', async(req, res) => {
    res.render('index');
})

router.get('/home', (req, res) => {
    let data = {
        user: req.session.user,
    }
    res.render("home", data);
})

router.get('/admin/new-user', (req, res) => {
    res.render("new-user");
})

module.exports = router;