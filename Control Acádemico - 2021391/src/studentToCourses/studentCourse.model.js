import { Schema, model } from "mongoose"

const studentToCourseSchema = Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
},
{
    versionKey: false
})

export default model('studentToCourse', studentToCourseSchema)