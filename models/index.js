import User from './user.model.js';
import Post from './post.model.js';
import Comment from './comment.model.js';
import Story from './story.model.js';
import Relationship from './relationship.model.js';
import Category from './category.model.js';
import PostCategory from './postCategory.model.js';
import PostImage from './postImage.model.js';

// 1️⃣ User ↔ Post
User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId', allowNull: false });

// 2️⃣ Post ↔ Comment
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId', allowNull: false });
// Post <-> Category (Many-to-Many) - Optional Extension
Post.belongsToMany(Category, { through: PostCategory, foreignKey: 'postId', otherKey: 'categoryId' });
Category.belongsToMany(Post, { through: PostCategory, foreignKey: 'categoryId', otherKey: 'postId' });

// post <->  postimages (one-to-many)
Post.hasMany(PostImage, {foreignKey: 'postId', onDelete: 'CASCADE'});
PostImage.belongsTo(Post, {foreignKey: 'postId', allowNull:false});

// 3️⃣ User ↔ Comment
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId', allowNull: false });

// 4️⃣ User ↔ Story
User.hasMany(Story, { foreignKey: 'userId', onDelete: 'CASCADE' });
Story.belongsTo(User, { foreignKey: 'userId', allowNull: false });

// 5️⃣ Self-referencing Relationship (Followers / Following)
User.hasMany(Relationship, { foreignKey: 'followerId', as: 'FollowingList' });
User.hasMany(Relationship, { foreignKey: 'followingId', as: 'FollowerList' });

Relationship.belongsTo(User, { foreignKey: 'followerId', as: 'Follower' });
Relationship.belongsTo(User, { foreignKey: 'followingId', as: 'Following' });
