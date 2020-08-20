const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const seedDB = require("./seeds")
let Campground = require("./models/campground")
let Comment = require("./models/comment")

mongoose.connect("mongodb://localhost:27017/yelp_camp_3", { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
seedDB();


app.get("/", function (req, res) {
    res.render("landing")
})

//index
app.get("/campgrounds", function (req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("index", { campgrounds: allCampgrounds })
        }
    })
})

// create
app.post("/campgrounds", function (req, res) {
    // get data from form and add to campgrounds array
    let name = req.body.name
    let image = req.body.image
    let newCampgrounds = { name: name, image: image }
    // Create a new campground and save to DB
    Campground.create(newCampgrounds, function (err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            // redirect back to campground
            res.redirect("/campgrounds")
        }
    })
})

// New
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs")
})

//Show
app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("show", { campground: foundCampground });
        }
    });
})



app.listen(3000, function () {
    console.log("server started")
})



// notes: 

// "mongo" to open up mongoDB console
// "show dbs" to view what database are there
// "use <db name>" to switch to that database
// "show collections" to show what collections are in that one database
// "db.<collection name>.find()" to see what data already stored in it
// "db.<collection name>.drop()" to clear everything in that database