var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

//Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/bhw_scraper", { useNewUrlParser: true });



// TEST SCRAPE ROUTE
app.get("/scrape", function (req, res) {
    console.log("Scrape Started")
    axios.get("http://blackhatworld.com").then(function (response) {
        var $ = cheerio.load(response.data);

        $(".discussionListItem visible").each(function (i, element) {
            var result = {};

            result.title = $(element)
                .find("h3 a")
                .text();
            result.link = $(element)
                .find("h3 a")
                .attr("href");
            result.views = $(element)
                .find("dl .minor")
                .children("dd").text()
            result.replies = $(element)
                .find("dl .major")
                .children("dd").text()

            db.Article.create(result).then(function (dbArticle) {
                console.log(dbArticle);
            }).catch(function (err) {
                console.log(err);
            });

        });

        res.send("Done Scraping");
    })
})




// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});