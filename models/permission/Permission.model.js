import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    permission_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_default: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // 0 -> not default, 1 -> default
    },
  },
  {
    tableName: "permissions",
    timestamps: true,
  }
);

export default Permission;
