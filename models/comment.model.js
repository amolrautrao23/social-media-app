import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Comment = sequelize.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: true,
})
export default Comment;