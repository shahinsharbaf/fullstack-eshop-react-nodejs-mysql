const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authrouter = require("./routes/auth/auth.router");
const sliderrouter = require("./routes/slider/slider.router");
const cookieparser = require("cookie-parser");
const productsrouter = require("./routes/products/products.router");
const paymentrouter = require("./routes/payment/payment.router");
const orderrouter = require("./routes/orders/order.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieparser());
app.use("/Images", express.static("./Images"));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/auth", authrouter);
app.use("/slider", sliderrouter);
app.use("/products", productsrouter);
app.use("/create-payment-intent", paymentrouter);
app.use("/orders", orderrouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
