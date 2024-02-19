'use strict'

import studentToCourse from './studentCourse.model.js'
import User from '../user/user.model.js'
import Course from '../courses/courses.model.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const assignStudentToCourse = async (req, res) => {
    try {
        const {studentId, courseId} = req.body
        const student = await User.findById(studentId)
        if (!student) {
            return res.status(404).send({message: 'Student not found'})
        }
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).send({message: 'Course not found'})
        }
        const studentAssigned = await studentToCourse.findOne({student: studentId, course: courseId})
        if (studentAssigned) {
            return res.status(400).send({message: 'The assignment of student to course already exists'})
        }
        const studentAssignedCount = await studentToCourse.countDocuments({student: studentId})
        if (studentAssignedCount >= 3) {
            return res.status(400).send({message: 'The student has been assigned to the maximum number of courses'})
        }
        const newStudentAssign = new studentToCourse({student: studentId, course: courseId})
        await newStudentAssign.save()
        return res.send({message: 'Student assigned to course successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error assigning the student to the course'})
    }
}

export const searchCourseWithStudent = async (req, res) => {
    try {
        const {username} = req.body
        const student = await User.findOne({ username })
        const course = await studentToCourse.find({student: student._id}).populate('course', ['name', 'description', 'duration', 'teacher'])
        if (!course.length) return res.status(404).send({message: 'Course of student not found'})
        return res.send({message: 'Courses found', course})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error to search course with the student', err: err})
    }
}