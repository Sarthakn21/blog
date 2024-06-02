import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();
import authMiddleware from "./middleware/auth.js";
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js"
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

mongoose
    .connect("mongodb://localhost:27017/brainop")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB", error);
    });
const port = 3000;


app.use("/user", userRoutes)
app.use("/post", authMiddleware, postRoutes)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

