import Like from '../models/like.model.js';
import { sendError, sendResponse } from '../utils/handleResponse.js';

export const toggleLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    console.log(userId,postId,"user-post")
    if (!userId || !postId) {
      return sendError(res, 400, 'userId and postId are required');
    }
    const existingLike = await Like.findOne({ where: { userId, postId } });
    if (existingLike) {
      await existingLike.destroy();
      return sendResponse(res, 200, 'Post unliked successfully');
    }
    await Like.create({ userId, postId });
    return sendResponse(res, 200, 'Post liked successfully');
  } catch (error) {
    console.error(error);
    return sendError(res, 500, error.message);
  }
};
