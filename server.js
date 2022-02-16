const express = require("express");
const path = require("path")
const routes = require('./controllers')
const session = require('express-session')
const exphbs = require('express-handlebars')

const app = express();
const PORT = process.env.PORT || 3001