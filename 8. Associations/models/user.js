const mongoose = require("mongoose")

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

module.exports = mongoose.model("User", userSchema)