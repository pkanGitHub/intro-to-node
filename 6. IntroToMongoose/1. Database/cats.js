const mongoose = require("mongoose") // known as ODM, Object Data Mapper
// it allow us to write js in js files and js code will interact with our database

mongoose.connect("mongodb://localhost/cat_app", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}) // connect to database

let catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
}) // defining pattern for data

let Cat = mongoose.model("Cat", catSchema)
// "Cat" => Always singular version of collection of our model, it'll pluralize to "Cats" itself

// Cat.find, Cat.remove, Cat.create

// adding a new cat to the DB
// let george = new Cat({
//     name: "Noami",
//     age: 10,
//     temperament: "Nippy"
// })

// george.save(function (err, cat) { // call back takes 2 params, 1 is potential error
//     if (err) {
//         console.log("SOMETHING WENT WRONG")
//     } else {
//         console.log("WE JUST SAVED THE CAT")
//         console.log(cat)
//     }
// })
//--------------------------------
// another way to create new cat

Cat.create({
    name: "Choco",
    age: 9,
    temperament: "Bland"
}, function (err, cat) {
    if (err) {
        console.log("Uh Oh! Something went wrong!")
    } else {
        console.log(cat)
    }
})



// retrieve all cats from the DB and console.log each one

Cat.find({}, function (err, cats) {
    if (err) {
        console.log("Uh-Oh, ERROR!")
    } else {
        console.log("All the cats")
        console.log(cats)
    }
})

