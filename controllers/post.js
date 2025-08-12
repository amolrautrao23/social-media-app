import { log } from "console";
import { deleteUploadedFiles } from "../middlewares/upload.js";
import Post from "../models/post.model.js";
import { sendError } from "../utils/handleResponse.js"
import { getRelativePath } from "../utils/helper.js";

export const addPost = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            deleteUploadedFiles(req.files)
            return sendError(res, null, 400, "Post title is required!")
        }
        log("path",req?.files?.img[0].path)
       const postImg=  getRelativePath(req?.files?.img[0].path || null)
        const savedPost = await Post.create({ title, description, img:postImg,userId:req.user.id })
        console.log(savedPost,"savedPost");
        res.sendResponse()
    } catch (error) {
        console.log("post errro", error)
        deleteUploadedFiles(req.files)
        return sendError(res, null, 500, "Something went wrong!")

    }
}