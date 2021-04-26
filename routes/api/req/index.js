const route = require("express").Router();
const User = require('../../../public/models/User');
const bcrypt = require("bcrypt");

route.get('/user-action/login', async(req, res) => {
    var lookedUpIndex = await User.findOne({ username: req.body.username });
        if(lookedUpIndex){
            let hashRes = false;

            await bcrypt.compare(req.body.password, lookedUpIndex.password, function(err, result) {
                if(result === true) {
                    req.session.user = lookedUpIndex;
                console.log(`${lookedUpIndex.username} just logged in!`)
                    res.redirect("/home");
                } else {
                return res.redirect('/login?error=wrongPass');
                }
            });
    
        } else {
            return res.redirect('/login?error=wrongUsername');
        }
});

route.get('/admin-action/new-user/create', async(req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    
    var checkHash;
    var passHash;
    var saltRounds = 20;

    if(req.body.adminPass === "00DV2123781$$") {
        bcrypt.hash(username, 0).then(async function (hashUsername) {
            console.log(hashUsername);
    
            bcrypt.hash(password, saltRounds).then(async function (hashPassword) {
    
                let beforeCheck = await User.findOne({ username: hashUsername }, { _id: false });
    
                if(beforeCheck){
                    console.log(beforeCheck);
                    if(beforeCheck.username === hashUsername) return res.redirect('/login?error=userTaken&action=register');
                }
            
                var id = crypto.randomBytes(10).toString('hex');
                await new User({ username: username, password: hashPassword, id: id  }).save();
    
                res.redirect("/");
    
            });
        });
    } else {
        res.sendStatus(404);
    }
})

module.exports = route;