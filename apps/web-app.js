const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require('body-parser');

const getFilesSync = require("../utils/fileWalk");

class App {
  constructor(locals = {}) {
    this.express = express();
    this.express.locals = locals;

    / * Middleware Functions */ 
    this.express.use(cookieParser());
    this.express.use(express.static(__dirname + "public"));
    this.express.use(express.static("public"))
  this.express.set("view engine", "ejs");
  this.express.set("views", "./templates")
  this.express.use(bodyParser());
  this.express.use('/public', express.static('public'));
  
  this.express.use(passport.initialize());
  this.express.use(passport.session());

    this.loadRoutes();
  }

  listen(port) {
    return new Promise((resolve) => this.express.listen(port, resolve));
  }

  loadRoutes() {
    const routesPath = path.join(__dirname, "../routes");
    const routes = getFilesSync(routesPath);

    if (!routes.length) return this;

    routes.forEach((filename) => {
      const route = require(path.join(routesPath, filename));

      const routePath =
        filename === "index.js" ? "/" : `/${filename.slice(0, -3)}`;

      try {
        this.express.use(routePath, route);
      } catch (error) {
        console.error(`Error occured with the route "${filename}"\n\n${error}`);
      }
    });

    return this;
  }
}

module.exports = App;