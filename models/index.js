import User from './user.model.js';
import Post from './post.model.js';
import Comment from './comment.model.js';
import Story from './story.model.js';
import Relationship from './relationship.model.js';
import Category from './category.model.js';
import PostCategory from './postCategory.model.js';
import PostImage from './postImage.model.js';
import Like from './like.model.js';
import Permission from './permission/Permission.model.js';
import UserPermission from './permission/userPermission.model.js';


// ================== 1️⃣ User ↔ Post (One-to-Many) ==================
User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId' });


// ================== 2️⃣ Post ↔ Comment (One-to-Many) ==================
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId' });


// ================== 3️⃣ User ↔ Comment (One-to-Many) ==================
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });


// ================== 4️⃣ User ↔ Story (One-to-Many) ==================
User.hasMany(Story, { foreignKey: 'userId', onDelete: 'CASCADE' });
Story.belongsTo(User, { foreignKey: 'userId' });


// ================== 5️⃣ Post ↔ Category (Many-to-Many) ==================
Post.belongsToMany(Category, {
  through: PostCategory,
  foreignKey: 'postId',
  otherKey: 'categoryId',
});

Category.belongsToMany(Post, {
  through: PostCategory,
  foreignKey: 'categoryId',
  otherKey: 'postId',
});


// ================== 6️⃣ Post ↔ PostImages (One-to-Many) ==================
Post.hasMany(PostImage, { foreignKey: 'postId', onDelete: 'CASCADE' });
PostImage.belongsTo(Post, { foreignKey: 'postId' });

User.belongsToMany(Permission,{through:UserPermission,foreignKey:'user_id',otherKey:'permission_id'})
Permission.belongsToMany(User,{through:UserPermission,foreignKey:'permission_id',otherKey:'user_id'})

// ================== 7️⃣ Post ↔ User (Likes) (Many-to-Many) ==================
Post.belongsToMany(User, {
  through: Like,
  foreignKey: 'postId',
  otherKey: 'userId',
  as: 'LikedUsers',     // ⭐ important alias
});

User.belongsToMany(Post, {
  through: Like,
  foreignKey: 'userId',
  otherKey: 'postId',
});


// ================== 8️⃣ Self Relationship (Followers / Following) ==================
User.hasMany(Relationship, {
  foreignKey: 'followerId',
  as: 'FollowingList',
});

User.hasMany(Relationship, {
  foreignKey: 'followingId',
  as: 'FollowerList',
});

Relationship.belongsTo(User, {
  foreignKey: 'followerId',
  as: 'Follower',
});

Relationship.belongsTo(User, {
  foreignKey: 'followingId',
  as: 'Following',
});
