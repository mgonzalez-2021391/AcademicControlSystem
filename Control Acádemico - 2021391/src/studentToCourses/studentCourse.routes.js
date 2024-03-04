import express from "express"
import { assignStudentToCourse, searchCourseWithStudent, test } from "./studentCourse.controller.js"

const api = express.Router();

api.get('/test', test)
api.post('/assign', assignStudentToCourse)
api.post('/search', searchCourseWithStudent)

export default api