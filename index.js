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

// let chuoi = [];
// const elementNumber = function (number) {
//   for (let index = 2; index <= number; index++) {
//     let isPrime = true;
//     for (let divisor = 2; divisor * divisor <= index; divisor++) {
//       if (index % divisor === 0) {
//         isPrime = false;

//         break;
//       }
//     }
//     if (isPrime) {
//       chuoi.push(index);
//     }
//   }
//   return chuoi;
// };

// console.log(`${elementNumber(50)}`);

// const fibonacci = function (n) {
//   let arr = [0, 1];
//   for (let index = 2; index < n; index++) {
//     arr.push(arr[index - 2] + arr[index - 1]);
//   }
//   return arr;
// };
// console.log(fibonacci(10));

// const descending = function (arr) {
//   const result = arr.sort(function (a, b) {
//     return -a + b;
//   });
//   return result;
// };
// console.log(descending([28, 5, 14, 87, 845, 54, 45, 487, 3, 48]));
// const ascending = function (arr) {
//   const result = arr.sort(function (a, b) {
//     return a - b;
//   });
//   return result;
// };
// console.log(ascending([28, 5, 14, 87, 845, 54, 45, 487, 3, 48]));

app.listen(port, () => console.log(`server running on port gege  ${port}`));
mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("connection fail!");
  });
