import dotenv from "dotenv";
import express from "express";
import ConnectDB from "./config/db.js";
import products from "./data/products.js";

const app = express();
dotenv.config();
ConnectDB();
app.get("/", (req, res) => {
  res.send("API is Running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id == req.params.id);
  res.json(product);
});

app.get("*", (req, res) => {
  res.send("Catching all");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is Running");
});
