let express = require("express")
let app = express()

// ejs = embedded js, has to be in "view" directory

// use "render" if we are pulling up files 
app.get("/", function (req, res) {
    res.render("home.ejs") // will look in views directory
})

app.get("/fallinlovewith/:thing", function (req, res) {
    let what = req.params.thing;
    res.render("love.ejs", { whatPassedIn: what })
})

app.get("/posts", function (req, res) {
    let posts = [
        { title: "Post 1", author: "Susy" },
        { title: "How I meet my first ferret", author: "Kan" },
        { title: "Working at first job", author: "Phil" }
    ]
    res.render("posts.ejs", { postsAppear: posts })
})

app.listen(3000, function () {
    console.log("server started")
}) 
