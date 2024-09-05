import express from "express";
import connectDB from "./database";
import itemRoutes from "./routes/item";
import { errorHandler } from "./middlewares/errorHandle";

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use("/api", itemRoutes);
app.use(errorHandler);

// Error handling middleware (optional but recommended)
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
