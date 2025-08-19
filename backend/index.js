import dotenv from "dotenv";
dotenv.config(); // load env first

import express from "express";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoutes.js";

let port = process.env.PORT || 6000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174","https://one-cart-mauve.vercel.app/"],
    credentials: true,
}));

app.use("/api/auth/", authRouter);
app.use("/api/user/", userRoutes);
app.use("/api/cart",cartRoutes)
app.use("/api/product/", productRoute);
app.use("/api/order/", orderRoutes);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    connectDB();
    console.log(`server is running on port ${port}`);
});
