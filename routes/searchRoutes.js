const express = require("express");
const app = express();
const router = express.Router();

const Site = require("../schemas/SiteSchema")
const Image = require("../schemas/ImageSchema")

app.use(express.urlencoded({extended: true}));
app.use(express.json())

router.get("/", async (req, res, next) => {
    var searchObj = req.query;
    if(req.query.q !== undefined) {

        var payload = {
            title: searchObj.q + "- Result from Search",
        }
        var start = req.query.start !== undefined ? parseInt(req.query.start) : 0;
        
        if(req.query.type === undefined) {
            searchObj = {
                $or: [
                    { url: { $regex: searchObj.q }},
                    { title: { $regex: searchObj.q }},
                    { description: { $regex: searchObj.q }},
                    { keywords: { $regex: searchObj.q }},
                ]
            }
            await Site.find(searchObj).skip(start).limit(10)
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
            searchObj = {
                $or: [
                    { url: { $regex: searchObj.q }},
                    { alt: { $regex: searchObj.q }},
                ]
            }
            await Image.find(searchObj).skip(start).limit(10)
            .then( results => {
                payload.results = JSON.stringify(results);
                res.status(200).render("search", payload)
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            })
        }
    }
    else {
        res.status(200).render("home");
    }

})

module.exports = router; 