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

    // Saves Article
    app.post("/api/articles/:id", function(req, res){
        db.Article.findOneAndUpdate(
            {_id:req.params.id},
            {saved: true},
            {new: true}
        ).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err){
            res.json(err)
        })
    })

     // Delete / Un-Saves Article
     app.post("/api/articles/unsave/:id", function(req, res){
        db.Article.findOneAndUpdate(
            {_id:req.params.id},
            {saved: false},
            {new: true}
        ).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err){
            res.json(err)
        })
    })

    // Clear ALL Articles in Database
    app.delete("/api/clear", function(req,res){
        db.Article.deleteMany({}).then(function(dbArticles){
            res.json(dbArticles);
        }).catch(function(err){
            res.json(err);
        })
    })

    
    // Get Notes from An Article
    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({_id: req.params.id})
          .populate("notes")
          .then(function(dbArticle) {
            res.json(dbArticle)
          })
          .catch(function(err) {
            res.json(err);
          })
      })


    // Post Notes to Article
    app.post("/articles/:articleID/notes", function(req,res){
        var articleID = req.params.articleID;

        db.Note.create(req.body).then(function(dbNote){
            return db.Article.findByIdAndUpdate({_id:articleID}, {
                $push: {notes: dbNote._id}}, {new:true})
        }).then(function(dbArticle){
            res.json(dbArticle);
        }).catch(function(err){
            res.json(err);
        })
    })

};