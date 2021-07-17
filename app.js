const express = require("express")
const app = express()
const port = process.env.PORT || 5000;
const path = require('path')
const mongoose = require("./database")

const server = app.listen(port, () => console.log("Server Listening on " + port));