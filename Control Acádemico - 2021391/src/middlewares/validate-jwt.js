'use strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt = async(req, res, next)=> {
    try{
        let secretKey = process.env.SECRET_KEY
        let { token } = req.headers
        let { uid } = jwt.verify(token, secretKey)
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message: 'User not found - Unauthorized'})
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token'})
    }
}

export const isUserId = async(req, res, next) => {
    let { user } = req
    let { id } = req.params
    if(!user || user.role !== 'TEACHER') {
        if(user && user.id !== id) return res.status(403).send({message: 'You dont have access'})
        next()
    } else{
        next()
    }
}