import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { sendError } from "../utils/handleResponse.js";

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return sendError(res, 401, "Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return sendError(res, 401, "Invalid or expired token.");
    }
});

export default verifyToken;
