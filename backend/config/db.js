import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB connected successfully");
    });

    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("DB connection error:", error.message);
    process.exit(1);
  }
};

export default ConnectDb;