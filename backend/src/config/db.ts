import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    console.log(process.env.PORT);
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);

    process.exit(1);
  }
};

export default connectDB;