const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Comment = require("./models").Comment;
const User = require("./models").User;
const Authorizer = require("../policies/post");

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
        return Post.findById(id, {
            include: [
                {model: Comment, as: "comments", include: [
                    {model: User}
                ]}
            ]
        })
    },

    deletePost(id, callback){
        
        return Post.destroy({
            where: {id}
        })
        .then((post) => {
            callback(null, post);
        })
        .catch((err) => {
            callback(err);
        })
    },

    updatePost(id, updatedPost, callback){

        return Post.findById(id)
        .then((post) => {
            if(!post){
                return callback("Post not found");
            }

            post.update(updatedPost, {
                fields: Object.keys(updatedPost)
            })
            .then(() => {
                callback(null, post);
            })
            .catch((err) => {
                callback(err);
            });
        })
        .catch((err) => {
            callback(err);
        });    
      },
    }
    
