'use strict'

import Course from './courses.model.js'
import { checkUpdateCourse } from '../utils/validator.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const create = async (req, res) => {
    try {
        let data = req.body
        let course = new Course(data)
        await course.save()
        return res.send({message: 'Creation of course successfully'})
    } catch (err) {
        console.error(err)
        return res.status(404).send({message: 'Error to create course'})
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdateCourse(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedCourse = await Course.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedCourse) return res.status(401).send({message: 'Course not found and not updated'})
        return res.send({message: 'Updated course', updatedCourse})
    } catch (err) {
        console.error(err)
        return res.status(404).send({message: 'Error to update course'})
    }
}

export const deleteCourse = async (req, res) => {
    try {
        let { id } = req.params
        let deletedCourse = await Course.findOneAndDelete({_id: id})
        if(!deletedCourse) return res.status(404).send({message: 'Course not found and not deleted'})
        return res.send({message: `The course of ${deletedCourse.name} has been deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error to delete the course'})
    }
}

export const searchCourseWithTeacher = async (req, res) => {
    try {
        const {teacherId} = req.body
        const courses = await Course.find({teacher: teacherId}).populate('teacher', ['names', 'surnames', 'email', 'role']);
        if (!courses.length) {
            return res.status(404).send({message: 'Courses of teacher not found'});
        }
        return res.send({message: 'Courses found', courses});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error searching courses with the teacher', err: err});
    }
}