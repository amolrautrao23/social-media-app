import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import { timeFrom } from "../../utils/times";
import MoreOptions from "../common/MoreOptions";
import Swal from "sweetalert2";
import { confirmDialog } from "../common/Confirm";
import { showToast } from "../../utils/Toast";
import axiosInstance from "../../utils/axiosConfig";
import { useMutation,useQueryClient } from "@tanstack/react-query";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  //TEMPORARY
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const liked = false;
  const queryClient = useQueryClient()
   const mutation = useMutation({
      mutationFn: (formData) => {
        return axiosInstance.get(`/posts/delete-post/${post.id}`, formData);
      },
      onSuccess: async() => {
        showToast('Post added successfully 🎉', 'success');
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        // Invalidate and refetch
        await queryClient.invalidateQueries({ queryKey: ['posts'] })
      },
      onError: (error) => {
        showToast(error?.response?.data?.message || 'Failed to add post ❌', 'error');
      },
    });
   const handleDelete = async e => {
    const confirmed = await confirmDialog({
      title: "Are you sure?",
      text: "This post will be permanently deleted.",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed) {
      // Proceed with deletion
      mutation.mutate();
      
    }
  };
const {profilePic,userId, name} = post?.User;
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={`${BASE_URL}${profilePic}`} alt="" />
            <div className="details">
              <Link
                to={`/profile/${userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{name}</span>
              </Link>
              <span className="date">{timeFrom(post?.updatedAt)}</span>
            </div>
          </div>
          <MoreOptions>
          <div className="option option--delete" onClick={handleDelete}>
            <DeleteIcon/> Delete Post
          </div>
          </MoreOptions>
        </div>
        <div className="content">
          {post?.description &&<p>{post.description}</p>}
          {post?.img && <img src={`${BASE_URL}${post.img}`} alt="" />}
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
