import mongoose from "mongoose";

export async function connectDB() {
 try {
    const mongoURI = process.env.M0NGODB_URI;

    if(!mongoURI){
        throw new Error("MONGO_URI is required")
    }

    const conn = await mongoose.connect(mongoURI)

    console.log("MongoDB connected successfully",conn.connection.host);
 } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
 }

}