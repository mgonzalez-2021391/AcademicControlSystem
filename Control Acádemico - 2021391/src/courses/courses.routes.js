import express from "express"
import { test, create, update, deleteCourse, searchCourseWithTeacher } from "./courses.controller.js"

const api = express.Router();

api.get('/test', test)
api.post('/create', create)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteCourse)
api.post('/search', searchCourseWithTeacher)

export default api