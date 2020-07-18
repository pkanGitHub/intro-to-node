let routePractice = require("express")
let app = routePractice()

app.get("/", function (req, res) {
    res.send("Hi there, welcome to my assignment!")
})

app.get("/speak/:animal", function (req, res) {
    let type = req.params.animal
    // let sound
    // if (type === "pig") {
    //     sound = "oink"
    // } else if (type === "cow") {
    //     sound = "Moo"
    // } else if (type === "dog") {
    //     sound = "Woof Woof!"
    // } else {
    //     sound = "huuuuuman"
    // }

    // another way to do it 
    let sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "Bow to me Huuuman!",
        ferret: "Let Wrestle!"
    }
    let sound = sounds[type]
    res.send("The " + type + " says " + sound)
})

app.get("/repeat/:saySomething/:times", function (req, res) {
    let whatYouSaid = req.params.saySomething
    let time = Number(req.params.times)
    let result = ""
    for (let i = 0; i < time; i++) {
        result += whatYouSaid + " "
    }
    res.send(result)
})

app.get("*", function (req, res) {
    res.send("Sorry, page not found... What are you doing with your life?")
})

app.listen(3000, function () {
    console.log("server started")
})