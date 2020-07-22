let express = require("express")
let app = express()
let bodyParser = require("body-parser") // take the req body and parse it into js object

app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")

let friends = ["Joe", "Rachel", "Stu", "Judy", "Iris"]


app.get("/", function (req, res) {
    res.render("home")
})

app.post("/addFriend", function (req, res) {
    let newFriend = req.body.newfriend // this works only if we installed body-parser
    friends.push(newFriend)
    res.redirect("/friends") // redirect
})

app.get("/friends", function (req, res) {
    res.render("friends", { friends: friends }) // {call anything: the array we are calling}
})

app.listen(3000, function () {
    console.log("server started")
})