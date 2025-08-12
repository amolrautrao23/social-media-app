import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { sendError } from "../utils/handleResponse.js";
import { log } from "console";

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return sendError(res, null, 401, "Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return sendError(res, err, 401, "Invalid or expired token.");
    }
});

export default verifyToken;
