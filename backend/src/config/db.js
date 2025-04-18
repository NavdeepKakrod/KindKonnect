import mongoose from "mongoose";

const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDb connection error:",error);
    }
};
 
export default connectDb;