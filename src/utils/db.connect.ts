import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export async function connectdb(){
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('db connection sucessful !!')
    } catch (error) {
        console.log('Error connecting db: ',error)
    }
}