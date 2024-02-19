import express from 'express'
import {test, registerStudent, registerTeacher, login, update, deleteU} from './user.controller.js'
import { isUserId } from '../middlewares/validate-jwt.js';


const api = express.Router();

api.get('/test', test)
api.post('/registerStudent', registerStudent)
api.post('/registerTeacher',  registerTeacher)
api.post('/login', login)
api.put('/update/:id', [isUserId], update )
api.delete('/delete/:id', [isUserId], deleteU)

export default api