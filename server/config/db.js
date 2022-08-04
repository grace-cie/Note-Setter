import mongoose from "mongoose"

const connectDB = async () => {
     try {
          const conn = await mongoose.connect(process.env.MONGO_URI)
          console.log(`MONGO DB CONNECTED: ${conn.connection.host}`.brightCyan.underline)
     } catch (error) {
          console.log(error)
          process.exit(1) //  close the process
     }
}
export default connectDB