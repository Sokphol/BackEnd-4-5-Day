import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "./.env") });

export const config = {
  MONGO_URI: process.env.MONGO_URI || "",
  PORT: process.env.PORT || 4000,
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to the database!");
  } catch (err) {
    console.error("Connection failed!", err);
    process.exit(1); // Exit the application on connection failure
  }
};

export default connectDB;
