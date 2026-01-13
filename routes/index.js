import {Router} from "express"
import userRoute from './user.route.js'
import likeRoute from './like.route.js'
import postRoute from './post.route.js'
import storyRoute from './story.route.js'
import commentRoute from './comment.route.js'
import verifyToken from "../middlewares/verifyToken.js"
import adminRoute from "./admin.route.js"
import isAdmin from "../middlewares/isAdmin.js"
import categoryRoute from "./category.route.js"
const routes =Router();
routes.use("/users",userRoute);
routes.use(verifyToken)
routes.use("/likes",likeRoute);
routes.use("/posts",postRoute);
routes.use("/story",storyRoute);
routes.use("/comments",commentRoute);
routes.use("/admin",isAdmin,adminRoute);
routes.use("/categories",categoryRoute);

export default routes