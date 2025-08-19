import mongoose from "mongoose"

// Make sure this is called before accessing process.env

const connectDB = async () => {
    try {
       

  await mongoose.connect(process.env.MONGO_URL)
  console.log("MongoDB connected")

    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB
