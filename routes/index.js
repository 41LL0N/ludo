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

router.get('/classes', (req, res) => {
    let data = {
        user: req.session.user,
    }
    res.render('classes', data);
});

router.get('/schedule', (req, res) => {
    let data = {
        user: req.session.user,
    }
    res.render("schedule", data);
})

router.get('/classes/:className', (req, res) => {
    let cName = req.params.className;

    if(cName === "math-methods-11ma1111a") {
        let data = {
            user: req.session.user,
        };

        res.render("classes/11ma1111a", data);
    }

    if(cName === "english-11en0115o") {
        let data = {
            user: req.session.user,
        };

        res.render("classes/11en0115o", data);
    }

    if(cName === "applied-computing-11it0112a") {
        let data = {
            user: req.session.user,
        };

        res.render("classes/11it0112a", data);
    }

    if(cName === "pathways-11path123") {
        let data = {
            user: req.session.user,
        };

        res.render("classes/11path123", data);
    }

    if(cName === "vet-business-11zbu11114a") {
        let data = {
            user: req.session.user,
        };

        res.render("classes/11zbu114a", data);
    }

    if(cName === "accounting-11ac0113a") {
        let data = {
            user: req.session.user,
        }; 
        res.render("classes/11ac0113a", data);
    }
})

module.exports = router;