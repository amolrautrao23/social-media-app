import asyncHandler from "../utils/asyncHandler.js";

const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user?.role !== 1) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
});

export default isAdmin;