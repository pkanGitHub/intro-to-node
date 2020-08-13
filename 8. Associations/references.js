const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/blog_demo_2", { useNewUrlParser: true, useUnifiedTopology: true })

const Post = require("./models/post")
const User = require("./models/user")

Post.create({
    title: "How to cook the best burger Part 4",
    content: "flaojafjdnkn"
}, function (err, post) {
    // add associations in reference
    User.findOne({ email: "bob@gmail.com" }, function (err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            foundUser.posts.push(post)
            foundUser.save(function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data)
                }
            })
        }
    })
})

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// })

// Find user
// find all post for that user
// to retrieve data
// User.findOne({ email: "bob@gmail.com" }).populate("posts").exec(function (err, user) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// })
