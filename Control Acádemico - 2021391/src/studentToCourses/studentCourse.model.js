import { Schema, model } from "mongoose"

const studentToCourseSchema = Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true
    }
},
{
    versionKey: false
})

export default model('studentToCourse', studentToCourseSchema)