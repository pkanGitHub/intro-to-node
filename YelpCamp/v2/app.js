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
    image: String
})

const Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//     {
//         name: "Mountain Goat's Rest",
//         image: "https://www.photosforclass.com/download/px_2422265"
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

app.get("/campgrounds", function (req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds", { campgrounds: allCampgrounds })
        }
    })
})

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

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs")
})

app.listen(3000, function () {
    console.log("server started")
})