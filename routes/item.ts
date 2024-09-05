import express, { NextFunction } from "express";
import Item from "../models/Item"; // Adjust the import based on your project structure
import { validateItem } from "../middlewares/validation";

const router = express.Router();

// Create Item
router.post("/items", validateItem, async (req, res, next) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error: any) {
    next(error);
  }
});

// Get All Items
router.get("/items",validateItem, async (req, res, next) => {
  try {
    // Get page and limit from query parameter.
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const category = req.query.category as string;
    const sortBy = (req.query.sortBy as string) || "price";
    const order = req.query.order === "desc" ? -1 : 1;

    // Calculate number to skip
    const skip = (page - 1) * limit;

    // Create filter object
    const filter = category ? { category } : {};

    // Fetch items with pagination
    const items = await Item.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: order });

    // Count total items
    const totalitem = await Item.countDocuments(filter);

    // Check if any items were found
    if (items.length === 0) {
      return res.status(404).json({ message: "Items not found!" });
    }

    // Calculate total pages
    const totalPage = Math.ceil(totalitem / limit);

    // Respond with pagination info at the top
    return res.status(200).json({
      totalitem,
      totalPage,
      currentPage: page,
      items, // Items come after pagination info
    });
  } catch (error) {
    next(error);
  }
});
//step 1 : Get all data from DB
//step 2 : send data to client

// Get Single Item by ID
router.get("/items/:id",validateItem, async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id); // Retrieves item by ID
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error: any) {
    next(error);
  }
});

// Update Item
router.put("/items/:id", validateItem, async (req, res, next) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (error: any) {
    next(error);
  }
});

export default router;
