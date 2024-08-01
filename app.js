require("dotenv").config();

require("./db")

const express = require("express");
const app = express();

const config = require("./config")
config(app)

// all routes here...
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

// gestor de errores
const errorHandling = require("./error-handling")
errorHandling(app)

module.exports = app