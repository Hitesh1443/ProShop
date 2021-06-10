import dotenv from "dotenv";
import express from "express";
import ConnectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();
ConnectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is Running");
});
