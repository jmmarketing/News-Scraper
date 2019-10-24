var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {


    // Scrapes the Title, Link, Last Message Data, Views, Replies, from BHW
    app.get("/scrape", function (req, res) {

        axios.get("http://blackhatworld.com").then(function (response) {
            var $ = cheerio.load(response.data);

            console.log("Scrape Started")
            console.log($(".discussionListItem.visible").length, 'items selected')
            $(".discussionListItem.visible").each(function (i, element) {
                var result = {};

                result.title = $(element)
                    .find("h3 a")
                    .text();
                result.lastMessage = $(element)
                    .find(".dateTime abbr")
                    .text()
                result.link = "http://blackhatworld.com/" + $(element)
                    .find("h3 a")
                    .attr("href");
                result.views = $(element)
                    .find("dl.minor")
                    .children("dd").text()
                result.replies = $(element)
                    .find("dl.major")
                    .children("dd").text()

                console.log(result);
                db.Article.create(result).then(function (dbArticle) {
                    console.log(dbArticle);
                }).catch(function (err) {
                    console.log(err);
                });

            });

            res.send("Done Scraping");
        }).catch(err => console.log(err))
    })

    // Gets all Articles
    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticles) {
                res.json(dbArticles);
            }).catch(function (err) {
                res.json(err);
            })
    });


    //Gets All Notes

    app.get("/notes", function (req, res) {
        db.Note.find({}).then(function (dbNotes) {
            res.json(dbNotes);
        }).catch(function (err) {
            res.json(err);
        })
    })


};