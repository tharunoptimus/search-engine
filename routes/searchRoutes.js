const express = require("express");
const app = express();
const router = express.Router();
var sanitize = require("mongo-sanitize");

const Site = require("../schemas/SiteSchema")
const Image = require("../schemas/ImageSchema")

app.use(express.urlencoded({extended: true}));
app.use(express.json())

router.get("/", async (req, res, next) => {
    req.query = sanitize(req.query);
    var searchObj = req.query;
    if(req.query.q !== undefined) {

        var payload = {
            title: req.query.q + "- Result from Search",
            q: req.query.q,
            type: req.query.type !== undefined ? req.query.type : null,
            start: req.query.start !== undefined ? req.query.start : 0,
        }
        var start = req.query.start !== undefined 
            ? parseInt(req.query.start) >= 0 
                ? parseInt(req.query.start) 
                : 0
            : 0;
        
        if(req.query.type === undefined) {
            searchObj = { $text: { $search: searchObj.q } },{ score: { $meta: "textScore" } }
            await Site.find(searchObj).skip(start).limit(10).sort( { score: { $meta: "textScore" } } )
            .then( results => {
                payload.results = JSON.stringify(results);
                res.status(200).render("search", payload)
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            })
        }
        else if(req.query.type == "images") {
            searchObj = { $text: { $search: searchObj.q } },{ score: { $meta: "textScore" } }
            await Image.find(searchObj).skip(start).limit(10).sort( { score: { $meta: "textScore" } } )
            .then( results => {
                payload.results = JSON.stringify(results);
                res.status(200).render("search", payload)
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            })
        }
        else {
            res.status(200).render("error")
        }
    }
    else {
        res.status(200).render("home");
    }

})

module.exports = router; 