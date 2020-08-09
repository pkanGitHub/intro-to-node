const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true, useUnifiedTopology: true })
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

// MONGOOSE/MODEL CONFIG
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
})

let Blog = mongoose.model("Blog", blogSchema)

// RESTFUL ROUTES
app.get("/", function (req, res) {
    res.redirect("/blogs")
})

app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("errors")
        } else {
            res.render("index", { blogs: blogs })
        }
    })
})

app.get("/blogs/new", function (req, res) {
    res.render("new")
})

app.post("/blogs", function (req, res) {
    // let title = req.body.title
    // let image = req.body.image
    // let body = req.body.body
    // let newBlogs = { title: title, image: image, body: body }
    res.redirect("/blogs")
})


app.listen(3000, function () {
    console.log("Server is up")
})