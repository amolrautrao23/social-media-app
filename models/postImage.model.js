import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const PostImage = sequelize.define(
  'PostImage',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'post_images',
    timestamps: true,
  }
);
export default PostImage;
