var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {

    // app.get("/scrape", function (req, res) {
    //     console.log("Scrape Started")
    //     axios.get("http://blackhatworld.com").then(function (response) {
    //         var $ = cheerio.load(response.data);

    //         $(".discussionListItem visible").each(function (i, element) {
    //             var result = {};

    //             result.title = $(element)
    //                 .find("h3 a")
    //                 .text();
    //             result.link = $(element)
    //                 .find("h3 a")
    //                 .attr("href");
    //             result.views = $(element)
    //                 .find("dl .minor")
    //                 .children("dd").text()
    //             result.replies = $(element)
    //                 .find("dl .major")
    //                 .children("dd").text()

    //             db.Article.create(result).then(function (dbArticle) {
    //                 console.log(dbArticle);
    //             }).catch(function (err) {
    //                 console.log(err);
    //             });

    //         });

    //         res.send("Done Scraping");
    //     })
    // })

};