import { deleteUploadedFiles } from "../middlewares/upload.js";
import Post from "../models/post.model.js";
import { sendError, sendResponse } from "../utils/handleResponse.js";
import { getRelativePath } from "../utils/helper.js";
import User from "../models/user.model.js"; // ✅ Only if needed for include

export const addPost = async (req, res) => {
  try {
    const { description } = req.body;

    // Extract image path if uploaded
    const postImg = req?.files?.img?.[0]
      ? getRelativePath(req.files.img[0].path)
      : null;

    // Validation: at least one required
    if (!description?.trim() && !postImg) {
      return res.status(400).json({ message: "Description or image required" });
    }

    // Save post
    const savedPost = await Post.create({
      description,
      img: postImg,
      userId: req.user.id,
    });

    return sendResponse(res, 201, "Post created successfully", savedPost);
  } catch (error) {
    console.error("post error", error);
    deleteUploadedFiles(req.files); // cleanup any uploaded files if error
    return sendError(res, null, 500, error.message || "Something went wrong!");
  }
};

export const getAllPosts = async (req, res) => {
  try {
    console.log("getAllPosts");

    const posts = await Post.findAll({
      include: [{ model: User }],
    });

    console.log(posts, "posts");

    return sendResponse(res, 200, "All posts fetched successfully", posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return sendError(res, null, 500, error.message || "Failed to fetch posts");
  }
};
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log("deletePost", postId);
    const post = await Post.findByPk(postId);
    if (!post) {
      return sendError(res, null, 404, "Post not found");
    }
    // Optional: Check if the user is authorized to delete the post
    if (post.userId !== req.user.id) {
      return sendError(res, null, 403, "You are not authorized to delete this post");
    }
    await post.destroy();
    return sendResponse(res, 200, "Post deleted successfully", null);
    } catch (error) {
    console.error("Error deleting post:", error);
    return sendError(res, null, 500, error.message || "Failed to delete post");
  }
};

