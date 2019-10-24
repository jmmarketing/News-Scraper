# News-Scraper
Homework 12 - News Scraper Using Express, Handlebars, Mongoose, Cheerio, Axios, &amp; Bootstrap.

## About News-Scraper
In this assignment, we'll create a website scrape with Cheerio, and then save the results to a database using MongoDB/Mongoose. Once the scrape is complete, you can save posts you like. Once saved, those posts can be viewed on the "Saved Articles" page. Additionally, you will be able to add notes to the article. 

At any point you are able to un-save the article, as well as clear all the posts you previously scraped. 

## Live Demo
[View, play with, the live Demo](https://boiling-plains-97145.herokuapp.com/)

### Libraries & Modules Used

* Bootstrap
* jQuery
* Express
* Mongoose
* Handlebars
* Axios
* Ajax

Note: Node was used for the local environment before deploying, as well as a local MongoDB. 

### Challenges Faced

The toughest part of this app, we getting the comments to dynamically populate with the corresponding saved Article. When saving new notes, I saved them to a seperate collection (called Notes) and then store the note ID in the article as an array. 

With the "Saved Articles" route, I was calling the Articles document, but originally I was not populating the "notes" values. 

The way I solved this, was calling all the saved articles on that route, but then adding the method of .populate("notes"). This way when the data was passed back to the page. I was able to call the notes in its own handlebars each helper. 

### Contributor(S)
[Jeff McLean](http://jeffreymclean.com)
