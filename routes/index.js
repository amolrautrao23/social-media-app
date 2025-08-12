import {Router} from "express"
import userRoute from './user.route.js'
import likeRoute from './like.route.js'
import postRoute from './post.route.js'
import storyRoute from './story.route.js'
import commentRoute from './comment.route.js'
import verifyToken from "../middlewares/verifyToken.js"
const routes =Router();
routes.use("/api/users",userRoute);
routes.use(verifyToken)
routes.use("/api/likes",likeRoute);
routes.use("/api/posts",postRoute);
routes.use("/api/story",storyRoute);
routes.use("/api/comments",commentRoute);

export default routes