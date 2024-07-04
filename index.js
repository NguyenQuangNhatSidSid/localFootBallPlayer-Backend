const express = require("express");
const mongoose = require("mongoose");
const { env } = require("dotenv").config();
const productRoute = require("./routers/product.router");
const userRoute = require("./routers/user.router");
const gameRoute = require("./routers/game.router");
const paymentRoute = require("./routers/payment.router");

const app = express();
const port = 3000;

//midleware
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

//route
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/game", gameRoute);
app.use("/api/game", paymentRoute);

//Api

// app.get("/api/product/:id", async (req, res) => {});

// app.post("/api/products", async (req, res) => {});

// app.put("/api/products/:id", async (req, res) => {});

// app.patch("/api/products/:id", async (req, res) => {});

// app.patch("/api/products", async (req, res) => {});

app.listen(port, () => console.log(`server running on port gege  ${port}`));
mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("connection fail!");
  });
module.exports = app;
