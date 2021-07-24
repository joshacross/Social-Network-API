const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');


//Schema
const PostSchema = new Schema({
//Name of Post
    postName: {
        type: String,
        required: 'You need to provide a post title!',
        trim: true
    },
// name of the user that created the post
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
// timestamp of when the post was created
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
// timestamp of any updates to the post's data
    updatedAt: {
        type: Date,
        default: Date.now
    },
// types of posts suggests
    types: {
        type: String,
        required: true,
        enum: ['Post', 'Photo', 'Reel', 'Snap', 'Message'],
        default: 'Message'
    },
// post's comments
    posts: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }   
);

// get total count of comments and replies on retrieval
postSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
  });
  

const post = model('post', postSchema);

//export post model
module.exports = post;
