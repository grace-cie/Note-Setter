import asyncHandler from 'express-async-handler' //wrap every func w this
import Sample from '../model/sampleModel.js'

import User from '../model/userModel.js'// for update


//   @desc Get sample
//   @route GET /api/sample
//   @access Private
export const getSample = asyncHandler( async (req, res) => {
     const sample = await Sample.find({ user: req.user.id }) //View contets in db by authorized user id
     res.status(200).json(sample)
})

//   @desc Set sample
//   @route POST /api/sample
//   @access Private
export const setSample = asyncHandler( async (req, res) => {
     console.log(req.body)//to see what did you put
     if(!req.body.text){
          res.status(400) //.json({ message: 'Please add a text field' })// bad request
          throw new Error('Please add a text field')
     }
     const sample = await Sample.create({ // samples collection with user name and id
          text: req.body.text,
          user: req.user.id, // to add samples by user authorized id 
     })
     res.status(200).json(sample)
})

//   @desc Update sample
//   @route PUT /api/sample/:id
//   @access Private
export const updateSample = asyncHandler( async (req, res) => {
     const sample = await Sample.findById(req.params.id)
     if(!sample){
          res.status(400)
          throw new Error(`Sample with an ID of ${req.params.id} has not found`)
     }

     //before we can update we must get the authorized user
     // const user = await User.findById(req.user.id)// this is the users id
     //check user
     if(!req.user){// if user doesn't exist
          res.status(401)// not authorized
          throw new Error('User not found')
     }
     // to make sure the logged in user matches the sample user/id 
     if(sample.user.toString() !== req.user.id){
          res.status(401)
          throw new Error('User Not authorized')
     }

     const updatedSample = await Sample.findByIdAndUpdate(
          req.params.id, //   @the id
          req.body, {    //   @the text that were passing
               new: true,     //   @create if doesn't exist
          })
     res.status(200).json(updatedSample)
})

//   @desc Delete sample
//   @route DELETE /api/sample/:id
//   @access Private
export const deleteSample = asyncHandler( async (req, res) => {
     const sample = await Sample.findById(req.params.id)
     if(!sample){
          res.status(400)
          throw new Error(`Sample with an ID of ${req.params.id} has not found`)
     }

     //before we can delete we must get the authorized user
     // const user = await User.findById(req.user.id)// this is the users id
     //check user
     if(!req.user){// if user doesn't exist
          res.status(401)// not authorized
          throw new Error('User not found')
     }
     // to make sure the logged in user matches the sample user/id 
     if(sample.user.toString() !== req.user.id){
          res.status(401)
          throw new Error('User Not authorized')
     }

     await sample.deleteOne() // or .remove()

     res.status(200).json({ id: req.params.id })
})