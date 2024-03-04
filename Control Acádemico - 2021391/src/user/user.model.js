import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    surnames: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['STUDENT', 'TEACHER'],
        required: true
    }
},
{
    versionKey: false
})

export default mongoose.model('user', userSchema)