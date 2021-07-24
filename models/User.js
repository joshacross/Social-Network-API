const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');


//Schema
const UserSchema = new Schema({
//Name of Post
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
// timestamp of when the user was created
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
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
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

// get total count of reactions and responses on retrieval
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
  

const User = model('user', UserSchema);

//export User model
module.exports = User;