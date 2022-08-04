import mongoose from "mongoose"

const sampleSchema = mongoose.Schema({
     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // user relationship
          required: true
     },
     text: {
          type: String,
          required: [true, 'please add a text value']
     }
},{
     timestamps: true,
})

export default mongoose.model('Sample', sampleSchema) //to the controller