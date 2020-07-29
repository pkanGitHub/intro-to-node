const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

let campgrounds = [
    { name: "Salmon Creek", image: "https://www.photosforclass.com/download/px_712067" },
    { name: "Granite Hill", image: "https://www.photosforclass.com/download/px_2398220" },
    { name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/px_2422265" }
]


app.get("/", function (req, res) {
    res.render("landing")
})

app.get("/campgrounds", function (req, res) {

    res.render("campgrounds", { campgrounds: campgrounds })
})

app.post("/campgrounds", function (req, res) {
    // get data from form and add to campgrounds array
    let name = req.body.name
    let image = req.body.image
    let newCampgrounds = { name: name, image: image }
    campgrounds.push(newCampgrounds)
    // redirect back to campground
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs")
})

app.listen(3000, function () {
    console.log("server started")
})