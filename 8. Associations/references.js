const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/blog_demo_2", { useNewUrlParser: true, useUnifiedTopology: true })

// POST - title, content
let postSchema = new mongoose.Schema({
    title: String,
    content: String
})

let Post = mongoose.model("Post", postSchema)

// USER - email, name
let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        // rather being in array of post like posts: [postSchema],
        // it's actually an array of "ObjectId" belonging to the posts
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

let User = mongoose.model("User", userSchema)

// Post.create({
//     title: "How to cook the best burger Part 3",
//     content: "jakjnfkankaj"
// }, function (err, post) {
//     // add associations in reference
//     User.findOne({ email: "bob@gmail.com" }, function (err, foundUser) {
//         if (err) {
//             console.log(err)
//         } else {
//             foundUser.posts.push(post)
//             foundUser.save(function (err, data) {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     console.log(data)
//                 }
//             })
//         }
//     })
// })

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// })

// Find user
// find all post for that user
// to retrieve data
User.findOne({ email: "bob@gmail.com" }).populate("posts").exec(function (err, user) {
    if (err) {
        console.log(err)
    } else {
        console.log(user)
    }
})
