import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const PostCategory = sequelize.define(
  'PostCategory',
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['postId', 'categoryId'],
      },
    ],
  }
);
export default PostCategory;
