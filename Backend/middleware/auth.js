import User from "../models/user.js";
import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        const user = await User.findById(decoded?._id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message || "Unauthorized" });
    }
};

export default authMiddleware;