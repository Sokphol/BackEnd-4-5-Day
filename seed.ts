import mongoose from "mongoose";
import Item from "./models/Item";
import connectDB from "./database";

const seedData = async () => {
  await connectDB();

  const items = [
    { name: "Item 1", price: 10.99, category: "Category A", stock: 100 },
    { name: "Item 2", price: 20.99, category: "Category B", stock: 200 },
    // Add more items as needed
  ];

  try {
    await Item.insertMany(items);
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect(); // Ensure disconnection after seeding
  }
};

seedData();
