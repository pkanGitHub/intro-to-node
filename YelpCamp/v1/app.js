const express = require('express')
const app = express()

app.set("view engine", "ejs")

app.get("/", function (req, res) {
    res.render("landing")
})

app.get("/campgrounds", function (req, res) {
    let campgrounds = [
        { name: "Salmon Creek", image: "https://www.photosforclass.com/download/px_712067" },
        { name: "Granite Hill", image: "https://www.photosforclass.com/download/px_2398220" },
        { name: "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/px_2422265" }
    ]

    res.render("campgrounds", { campgrounds: campgrounds })
})

app.listen(3000, function () {
    console.log("server started")
})