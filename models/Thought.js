const { Schema, model, Types } = require("mongoose");
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
    username: {
        type: String,
        required: true,
        trim: true
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
        default: 'Message'
    },
    // reactions on thoughts
    thoughts: [],
    reactions: [ReactionSchema],
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }   
);


// Reaction Fields Subdocument Schema referenced in the Thought model above^
const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent thought _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        trim: true,
        maxLength: 280
      },
      username: {
        type: String,
        required: true,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
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
    return this.reactions.length;
  });
  

const Thought = model('thought', thoughtSchema);

//export post model
module.exports = Thought;