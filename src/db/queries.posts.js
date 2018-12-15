const Post = require("./models").Post;
const Topic = require("./models").Topic;

module.exports = {
    addPost(newPost, callback){
        return Post.create(newPost)
        .then((post) => {
            callback(null, post);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getPost(id, callback){
        return Post.findById(id)
        .then((post) => {
            callback(null, post);
        })
        .catch((err) => {
            callback(err);
        })
    }
}