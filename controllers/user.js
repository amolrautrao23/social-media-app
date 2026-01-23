import { Op } from 'sequelize';
import User from '../models/user.model.js';
import { sendError, sendResponse } from '../utils/handleResponse.js';
import bcrypt from 'bcrypt';
import { deleteUploadedFiles } from '../middlewares/upload.js';
import jwt from 'jsonwebtoken';
import { getRelativePath } from '../utils/helper.js';
import { join } from 'path';
export const registerUser = async (req, res) => {
  try {
    const { name, username, password, email, city, website, role = 0 } = req.body;
    //check if use is already exist
    const user = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });
    if (user) {
      deleteUploadedFiles(req.files);
      return sendError(res, 401, 'User already exists!');
    }
    const profilePicPath = getRelativePath(req.files?.profilePic?.[0]?.path) || null;
    const coverPicPath = getRelativePath(req.files?.coverPic?.[0]?.path) || null;
    //check all required fields
    if (!name || !username || !email || !password) {
      deleteUploadedFiles(req.files);
      return sendError(res, 401, 'All fields are required!');
    }
    // convert role to integer
    const roleInt = parseInt(role);
    if (roleInt && roleInt === 1) {
      deleteUploadedFiles(req.files);
      return sendError(res, 403, 'Cannot assign Super Admin role!');
    }
    if (roleInt && roleInt > 3) {
      deleteUploadedFiles(req.files);
      return sendError(res, 403, 'Invalid role specified!');
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
      role: roleInt,
      profilePic: profilePicPath,
      coverPic: coverPicPath,
    });
    const userData = newUser.get({ plain: true });
    const { password: _, ...withoutPassword } = userData;
    sendResponse(res, 201, 'User created Successfully!', withoutPassword);
  } catch (err) {
    console.error(err);
    deleteUploadedFiles(req.files);
    sendError(res, 500, 'Something went wrong!');
  }
};
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //check user is exist or not
    const existingUser = await User.findOne({ where: { [Op.or]: [{ email: username }, { username }] } });
    if (!existingUser) return sendError(res, 404, 'User not found with is email or username!');

    //if exist check password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return sendError(res, 401, 'Incorrect Password');

    //set coockies if all ok and send response
    const token = jwt.sign({ id: existingUser.id, name: existingUser.name, role: existingUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 1000 });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    return sendResponse(res, 200, `Welcome back, ${existingUser.name}`, {
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        profilePic: existingUser.profilePic,
        coverPic: existingUser.coverPic,
        name: existingUser.name,
      },
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, error.message);
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
// Get current authenticated user info
export const getMe = async (req, res) => {
  try {
    // req.user should be set by verifyToken middleware
    const userId = req.user?.id;
    if (!userId) return sendError(res, 401, 'Not authenticated');

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });
    if (!user) return sendError(res, 404, 'User not found');

    return sendResponse(res, 200, 'User info fetched', user);
  } catch (err) {
    console.error(err);
    return sendError(res, 500, err?.message);
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return sendResponse(res, 200, 'Users fetched successfully', users);
  } catch (err) {
    console.error(err);
    return sendError(res, 500, err?.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, username, password, email, city, website, role = 0 } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return sendError(res, 404, 'User not found');
    if (name) user.name = name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (city) user.city = city;

    if (role && parseInt(role) === 1) {
      return sendError(res, 403, 'Cannot assign Super Admin role!');
    }
    if (role && parseInt(role) > 3) {
      return sendError(res, 403, 'Invalid role specified!');
    }
    if (role) user.role = parseInt(role);

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    // Handle profilePic update
    if (req?.files?.profilePic?.length) {
      if (user.profilePic) {
        deleteUploadedFiles([{ path: join(process.cwd(), user.profilePic) }]);
      }
      user.profilePic = getRelativePath(req.files.profilePic[0].path);
    }
    await user.save();
    const userData = user.get();
    const { password: _, ...withoutPassword } = userData;
    return sendResponse(res, 200, 'User updated successfully', withoutPassword);
  } catch (error) {
    console.error(error);
    return sendError(res, 500, error?.message);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return sendError(res, 404, 'User not found');
    }
    // Delete profilePic and coverPic files if exist
    if (user.profilePic) {
      deleteUploadedFiles([{ path: join(process.cwd(), user.profilePic) }]);
    }
    if (user.coverPic) {
      deleteUploadedFiles([{ path: join(process.cwd(), user.coverPic) }]);
    }
    await user.destroy();
    return sendResponse(res, 200, 'User deleted successfully');
  } catch (error) {
    console.error(error);
    return sendError(res, 500, error?.message);
  }
};
