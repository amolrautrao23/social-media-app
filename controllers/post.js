import { deleteUploadedFiles } from '../middlewares/upload.js';
import Post from '../models/post.model.js';
import { sendError, sendResponse } from '../utils/handleResponse.js';
import { getRelativePath } from '../utils/helper.js';
import User from '../models/user.model.js';
import Category from '../models/category.model.js';
import asyncHandler from '../utils/asyncHandler.js';

import PostImage from '../models/postImage.model.js';
import Like from '../models/like.model.js';
import { Sequelize } from 'sequelize';

export const addPost = async (req, res) => {
  try {
    const { description, categories = [] } = req.body;

    if (!description?.trim() && !req?.files?.img?.length) {
      deleteUploadedFiles(req.files);
      return sendError(res, 400, 'Description or image required');
    }

    const savedPost = await Post.create({
      description,
      userId: req.user.id,
    });

    // ✅ Save images
    if (req?.files?.img?.length) {
      const images = req.files.img.map((file) => ({
        postId: savedPost.id,
        imagePath: getRelativePath(file.path),
      }));

      await PostImage.bulkCreate(images);
    }

    // ✅ Save categories
    if (categories.length) {
      await savedPost.setCategories(categories);
    }

    return sendResponse(res, 201, 'Post created', savedPost);
  } catch (err) {
    deleteUploadedFiles(req.files);
    return sendError(res, 500, err.message);
  }
};
export const updatePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const { description, categories = [] } = req.body;

  const post = await Post.findByPk(postId);
  if (!post) return sendError(res, 404, 'Post not found');

  if (post.userId !== req.user.id) return sendError(res, 403, 'Not authorized');

  if (description !== undefined) {
    post.description = description;
    await post.save();
  }

  // ✅ Replace images if new uploaded
  if (req?.files?.img?.length) {
    const oldImages = await PostImage.findAll({ where: { postId } });

    oldImages.forEach((img) => deleteUploadedFiles([{ path: join(process.cwd(), img.imagePath) }]));

    await PostImage.destroy({ where: { postId } });

    const newImages = req.files.img.map((file) => ({
      postId,
      imagePath: getRelativePath(file.path),
    }));

    await PostImage.bulkCreate(newImages);
  }

  if (categories.length) {
    await post.setCategories(categories);
  }

  return sendResponse(res, 200, 'Post updated', post);
});

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'profilePic'],
        },
        {
          model: Category,
          through: { attributes: [] },
        },
        {
          model: PostImage,
          attributes: ['imagePath'],
        },
        {
          model: User,
          as: 'LikedUsers',
          attributes: ['id', 'name', 'profilePic'],
          through: { attributes: [] },
        },
      ],
    });

    return sendResponse(res, 200, 'All posts fetched successfully', posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return sendError(res, 500, error.message || 'Failed to fetch posts');
  }
};
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log('deletePost', postId);
    const post = await Post.findByPk(postId);
    if (!post) {
      return sendError(res, 404, 'Post not found');
    }
    // Optional: Check if the user is authorized to delete the post
    if (post.userId !== req.user.id) {
      return sendError(res, 403, 'You are not authorized to delete this post');
    }
    await post.destroy();
    return sendResponse(res, 200, 'Post deleted successfully', null);
  } catch (error) {
    console.error('Error deleting post:', error);
    return sendError(res, 500, error.message || 'Failed to delete post');
  }
};
