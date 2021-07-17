const express = require("express")
const app = express()
const port = process.env.PORT || 5000;
const path = require('path')
const mongoose = require("./database")

const server = app.listen(port, () => console.log("Server Listening on " + port));

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

// Routes
const homeRoute = require("./routes/homeRoutes");
const searchRoute = require("./routes/searchRoutes");

app.use("/", homeRoute);
app.use("/home", homeRoute);
app.use("/search", searchRoute);