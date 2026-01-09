import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import User from "../user.model.js";
import Permission from "./permission/Permission.model.js";

const UserPermission = sequelize.define(
  "UserPermission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "user_permissions",
    timestamps: true,
  }
);

/* Associations */
User.hasMany(UserPermission, { foreignKey: "user_id" });
UserPermission.belongsTo(User, { foreignKey: "user_id" });

Permission.hasMany(UserPermission, { foreignKey: "permission_id" });
UserPermission.belongsTo(Permission, { foreignKey: "permission_id" });

export default UserPermission;
