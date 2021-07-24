const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');
const { User } = require('./User');

//Schema
const thoughtSchema = new Schema({
//Title of the thought
    thoughtName: {
        type: String,
        required: 'You must title your thought!',
        trim: true
    },
    thoughtText: {
        type: String,
        required: 'You need to leave a thought',
        minlength: 1,
        maxlength: 280
    },
// name of the user that created the post
    username: {
        type: String,
        required: true,
    },
// timestamp of when the post was created
    createdAt: {
        type: Date,
        default: Date.now,
        getters: (createdAtVal) => dateFormat(createdAtVal)
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
        default: 'currentThought'
    },
    // thoughs array to hold user's thoughts
    thoughts: [],
    // reactions on thoughts, reference reactionSchema
    reactions: [reactionSchema],
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    id: true
    }   
);

  // get total count of comments and replies on retrieval
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });
  

const Thought = model('Thought', thoughtSchema);

//export post model
module.exports = Thought;