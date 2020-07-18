let express = require("express");
const { response } = require("express");
let app = express();


// "/" => "Hi there!"
app.get("/", function (request, response) {
    response.send("Hi there!")
});

// "/bye" => "Bye!"
app.get("/bye", function (req, res) {
    res.send("Bye!");
})

// "/dog" => "MEOW"

app.get("/dog", function (req, res) {
    res.send("MEOW!")
})

// route params
app.get("/r/:subredditName", function (req, res) {

    let subreddit = req.params.subredditName;
    res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");
})


app.get("/r/:subredditName/comments/:id/:title", function (req, res) {
    console.log(req.params);
    // will give out 3 params
    res.send("WELCOME TO THE COMMENTS PAGE!");
})


// "*" => any url aside from the one already defined
// it matters the order you put it
app.get("*", function (req, res) {
    res.send("YOU ROCKS!")
})

// get the port
app.listen(3000, function () {
    console.log("server has started")
})

// npm i -g nodemon
// nodemon to automate node server