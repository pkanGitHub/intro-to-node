const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true, useUnifiedTopology: true })

// if we are embedding postSchema in User model, we need to have postSchema first 
// POST - title, content
let postSchema = new mongoose.Schema({
    title: String,
    content: String
})

// USER - email, name
let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
})

let User = mongoose.model("User", userSchema)



let postModel = mongoose.model("Post", postSchema)

// let newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// })

// // push this post into new user
// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding. Go to potions class to learn it!"
// })

// newUser.save(function (err, user) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// })

// let newPost = new postModel({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// })

// newPost.save(function (err, post) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(post)
//     }
// })

User.findOne({ name: "Hermione Granger" }, function (err, user) {
    if (err) {
        console.log(err)
    } else {
        user.posts.push({
            title: "3 thing I really hate",
            content: "Voldmort. Voldmort. Voldmort."
        })

        user.save(function (err, user) {
            if (err) {
                console.log(err)
            } else {
                console.log(user)
            }
        })
    }
})