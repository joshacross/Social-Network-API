const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');


//Schema
const thoughtSchema = new Schema({
//Name of Post
    thoughtName: {
        type: String,
        required: 'You must title your thought!',
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
    // types of thoughts
    types: {
        type: String,
        required: true,
        enum: ['thinking', 'currentThought', 'afterThought'],
        default: 'Message'
    },
    // reactions on thoughts
    thoughts: [],
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ],
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
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce((total, reaction) => total + reaction.replies.length + 1, 0);
  });
  

const thought = model('thought', thoughtSchema);

//export post model
module.exports = thought;
