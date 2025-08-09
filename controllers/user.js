import { Op } from "sequelize";
import User from "../models/user.model.js";
import { sendError, sendResponse } from "../utils/handleResponse.js"
import bcrypt from "bcrypt"
import { deleteUploadedFiles } from "../middlewares/upload.js";
export const registerUser = async (req, res) => {
    try {
        const { name, username, password, email, city, website } = req.body;
        //check if use is already exist
        const user = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } })
        if (user) {
            deleteUploadedFiles(req.files);
            return sendError(res, null, 401, "User already exists!");
        }
        const profilePicPath = req.files?.profilePic?.[0]?.path || null;
        const coverPicPath = req.files?.coverPic?.[0]?.path || null;
        //check all required fields 
        if (!name || !username || !email || !password) {
            deleteUploadedFiles(req.files);
            return sendError(res, null, 401, "All fields are required!");
        }
        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // add user into the database
        const newUser = await User.create({
            name,
            username,
            password: hashedPassword,
            email,
            city,
            website,
            profilePic: profilePicPath,
            coverPic: coverPicPath
        })
        const userData = newUser.get({ plain: true });
        const { password: _, ...withoutPassword } = userData;
        console.log("new user", userData)
        sendResponse(res, 201, "User created Successfully!", withoutPassword)
    }
    catch (err) {
        console.error(err);
        deleteUploadedFiles(req.files);
        sendError(res, null, 500, "Something went wrong!");
    }
}
export const loginUser = (req, res) => {
    res.send("this is login route")
}
export const logoutUser = (req, res) => {
    res.send("this is logout route")
}