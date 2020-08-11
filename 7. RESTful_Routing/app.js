const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const expressSanitizer = require("express-sanitizer")

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true, useUnifiedTopology: true })
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSanitizer()) // to prevent users including script tag in the webpage
app.use(methodOverride("_method")) // Reminder: ?_method=PUT"


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
// INDEX
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("errors")
        } else {
            res.render("index", { blogs: blogs })
        }
    })
})

// NEW
app.get("/blogs/new", function (req, res) {
    res.render("new")
})

//CREATE
app.post("/blogs", function (req, res) {
    // sanitizing
    // req.body.blog.body = req.sanitize(req.body.blog.body)
    // req body is whatever coming from the form
    // blog.body is our blog[body]
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render("new")
        } else {
            res.redirect("/blogs")
        }
    })
})

//SHOW
app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.render("show", { blog: foundBlog })
        }
    })
})

// EDIT
app.get("/blogs/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.render("edit", { blog: foundBlog })
        }
    })
})

// UPDATE 
app.put("/blogs/:id", function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body)

    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        //id, newData, callback
        if (err) {
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs/" + req.params.id)
        }
    })
})

// DELETE
app.delete("/blogs/:id", function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs")
        }
    })
})


app.listen(3000, function () {
    console.log("Server is up")
})