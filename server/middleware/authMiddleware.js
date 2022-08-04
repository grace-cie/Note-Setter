//import this in userroutes to protect
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
     let token //initialize token

     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){ //make sure its a bearer token
          try {
               //get the token from header
               token = req.headers.authorization.split(' ')[1] //[1]just the token //split turns the header into array

               //verify token
               const decoded = jwt.verify(token, process.env.JWT_SECRET)

               //get user from the token
               req.user = await User.findById(decoded.id).select('-password')//'-password' wont inlude the password

               next()
          } catch (error) {
               console.log(error)
               res.status(401)// not authorized
               throw new Error('Not Authorized')
          }
     }
     if(!token){
          res.status(401)// not authorized
          throw new Error('Not Authorized no token')          
     }
})
export default protect