import axiosInstance from "../../utils/axiosConfig";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";

const Posts = () => {
const getAllPosts = async () => {
  try {
    const res = await axiosInstance.get("/posts/get-posts");
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
if(isLoading) return <div>Loading...</div>
if(isError) return <div>Error: {error.message}</div>
console.log(posts, "posts in posts component");

  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
