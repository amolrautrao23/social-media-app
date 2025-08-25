import { Op } from 'sequelize';
import User from '../models/user.model.js';
import { sendError, sendResponse } from '../utils/handleResponse.js';
import bcrypt from 'bcrypt';
import { deleteUploadedFiles } from '../middlewares/upload.js';
import path from 'path';
import jwt from 'jsonwebtoken';
import { getRelativePath } from '../utils/helper.js';
export const registerUser = async (req, res) => {
  try {
    const { name, username, password, email, city, website } = req.body;
    //check if use is already exist
    const user = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });
    if (user) {
      deleteUploadedFiles(req.files);
      return sendError(res, null, 401, 'User already exists!');
    }
    const profilePicPath = getRelativePath(req.files?.profilePic?.[0]?.path) || null;
    const coverPicPath = getRelativePath(req.files?.coverPic?.[0]?.path) || null;
    //check all required fields
    if (!name || !username || !email || !password) {
      deleteUploadedFiles(req.files);
      return sendError(res, null, 401, 'All fields are required!');
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
      coverPic: coverPicPath,
    });
    const userData = newUser.get({ plain: true });
    const { password: _, ...withoutPassword } = userData;
    console.log('new user', userData);
    sendResponse(res, 201, 'User created Successfully!', withoutPassword);
  } catch (err) {
    console.error(err);
    deleteUploadedFiles(req.files);
    sendError(res, null, 500, 'Something went wrong!');
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    //check validation
    if (!email || !username || !password) {
      return sendError(res, null, 400, 'All fields are required!');
    }
    //check user is exist or not
    const existingUser = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });
    if (!existingUser) return sendError(res, null, 404, 'User not found with is email or username!');

    //if exist check password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return sendError(res, null, 401, 'Incorrect Password');

    //set coockies if all ok and send response
    const token = jwt.sign({ id: existingUser.id, name: existingUser.name }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 1000 });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });
    return sendResponse(res, 200, 'Login successful', {
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
      },
    });
  } catch (error) {
    console.error(error);
    return sendError(res, error, 500, 'Something went wrong!');
  }
};
export const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return sendResponse(res, 200, 'Logged out successfully');
};
