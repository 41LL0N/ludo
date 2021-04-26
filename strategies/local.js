const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../public/models/User');
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await User.findOne({ email });
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.log(err);
        done(err);
    }
});

passport.use(
    new LocalStrategy(
    async function(username, password, done) {
      await User.findOne({ email: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        bcrypt.hash(password, 15).then(async function (hashPassword) {
            if(hashPassword != user.password) return done(null, false, { message: "Incorrect password." })
        });
        return done(null, user);
      });
    }
  )
);