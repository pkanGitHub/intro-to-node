let express = require("express")
let app = express()

app.use(express.static("public")) // tell Express to serve <any> directory other than views
app.set("view engine", "ejs") // so don't need to type in ejs for all view files passed in in res.render

// ejs = embedded js, has to be in "view" directory

// use "render" if we are pulling up files 
app.get("/", function (req, res) {
    res.render("home") // will look in views directory
})

app.get("/fallinlovewith/:thing", function (req, res) {
    let what = req.params.thing;
    res.render("love", { whatPassedIn: what })
})

app.get("/posts", function (req, res) {
    let posts = [
        { title: "Post 1", author: "Susy" },
        { title: "How I meet my first ferret", author: "Kan" },
        { title: "Working at first job", author: "Phil" }
    ]
    res.render("posts", { postsAppear: posts })
})

app.listen(3000, function () {
    console.log("server started")
}) 
