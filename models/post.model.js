import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Post = sequelize.define("Post",{
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.TEXT,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false,
        }
}, {
    timestamps: true,
})
export default Post;