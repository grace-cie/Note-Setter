import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler' //wrap every func w this
import User from '../model/userModel.js'

//   @desc Register user
//   @route POST /api/user
//   @access public
export const registerUser = asyncHandler( async (req, res) => {
     const { name, email, password } = req.body
     if (!name) {
          res.status(400)
          throw new Error('Please provide a Name')
     } else if (!email) {
          res.status(400)
          throw new Error('Please provide an Email')
     } else if (!password) {
          res.status(400)
          throw new Error('Please provide a Password')
     }
     
     //checks if user exist
     const userExist = await User.findOne({email}) //find through email which is unique
     if(userExist){
          res.status(400)
          throw new Error('User Already exist!')
     }

     //Hash the pass
     const salt = await bcrypt.genSalt(10) //number of rounds 10 is the default
     const hashedPassword = await bcrypt.hash(password, salt)// raw pass and saltedpass = hashed pass
     
     //Create the user
     const user = await User.create({
          name,
          email,
          password: hashedPassword
     })
     if(user){ //id user created
          res.status(201).json({
               _id: user.id,
               name: user.name,
               email: user.email,
               token: generateToken(user._id)
          })
     } else {
          res.status(400)
          throw new Error('Invalid User Data')
     }

})

//   @desc Authenticate user
//   @route POST /api/user/login
//   @access public
export const loginUser = asyncHandler( async (req, res) => {
     const { email, password } = req.body
     const user = await User.findOne({email}) //find through email which is unique
     if(user && (await bcrypt.compare(password, user.password))){ // raw pass innput and userhashed pass compare
          res.json({
               _id: user.id,
               name: user.name,
               email: user.email,
               token: generateToken(user._id)
          })
     } else {
          res.status(400)
          throw new Error('Invalid Credentials')          
     }
})

//   @desc Get user data
//   @route POST /api/user/me
//   @access private // create a middleware for this
export const getMe = asyncHandler( async (req, res) => {
     res.status(200).json(req.user)
})                                                          //     const {_id, name, email} = await User.findById(req.user.id)
                                                            //     res.status(200).json({
                                                            //      id: _id,
                                                            //      name,
                                                            //      email,
                                                            //     })





//   @desc Generate JWT
//   @access private
const generateToken = (id) => {
     return jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
     })
}