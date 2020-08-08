const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

const Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//     {
//         name: "Mountain Goat's Rest",
//         image: "https://pixabay.com/get/57e8d1464d53a514f1dc84609620367d1c3ed9e04e507440732973d59f44cc_340.jpg",
//         description: "There's many goats, very grassy"
//     }, function (err, campground) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("Newly created campground")
//             console.log(campground)
//         }
//     }
// )


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
    res.render("show")
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