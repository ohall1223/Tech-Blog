const express = require("express");
const path = require("path")
const routes = require('./controllers')
const session = require('express-session')
const exphbs = require('express-handlebars')
const sequalize = require('./config/connection');
const sequelize = require("sequelize");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// initialize the server
const app = express();
const PORT = process.env.PORT || 3001

// session
const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));

// use controllers
app.listen("/", controller);

// set handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars")

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});