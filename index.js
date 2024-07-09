const express = require("express");
const mongoose = require("mongoose");
const { env } = require("dotenv").config();
const productRoute = require("./routers/product.router");
const userRoute = require("./routers/user.router");
const gameRoute = require("./routers/game.router");
const paymentRoute = require("./routers/payment.router");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

//midleware
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

//route
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/game", gameRoute);
app.use("/api/game", paymentRoute);

//Error Handling Middleware
app.use(errorHandler);
//start Server
app.listen(port, () => console.log(`server running on port gege  ${port}`));

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("connection fail!", err.message);
  });
module.exports = app;
