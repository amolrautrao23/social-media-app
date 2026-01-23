import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const Like = sequelize.define(
  'Like',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'postId'],
      },
    ],
  }
);
export default Like;
