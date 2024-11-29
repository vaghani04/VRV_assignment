import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connection failed : ", error);
  }
};

export default connectDB;
