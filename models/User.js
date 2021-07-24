const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcrypt');


//Schema
const userSchema = new Schema({
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
    password: {
        type: String,
        required: true,
        minlength: 5
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
    // userImage: {
    //     type: String,
    //     default: 'default.png'
    // },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
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

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10
        this.passsword = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// get total count of reactions and responses on retrieval
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
  

const User = model('User', UserSchema);

//export User model
module.exports = User;