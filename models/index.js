import User from './user.model.js'
import Post from './post.model.js'
import Comment from './comment.model.js'
import Story from './story.model.js'
import Relationship from './relationship.model.js'

// User-Post: One user can have many posts
User.hasMany(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId', allowNull: false });

// Post-Comment: One post can have many comments
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId', allowNull: false });

// User-Comment: One user can make many comments
User.hasMany(Comment, { foreignKey: 'commentId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId', allowNull: false });

// User-Story: One user can have many stories
User.hasMany(Story, { foreignKey: 'storyId', onDelete: 'CASCADE' });
Story.belongsTo(User, { foreignKey: 'userId', allowNull: false });

// Relationship: Follows/friends between users
User.hasMany(Relationship, { foreignKey: 'followerId', as: 'Followers' });
User.hasMany(Relationship, { foreignKey: 'followingId', as: 'Following' });
Relationship.belongsTo(User, { foreignKey: 'followerId', as: 'Follower' });
Relationship.belongsTo(User, { foreignKey: 'followingId', as: 'Following' });