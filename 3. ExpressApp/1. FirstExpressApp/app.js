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

// get the port
app.listen(3000, function () {
    console.log("server has started")
})

// npm i -g nodemon
// nodemon to automate node server