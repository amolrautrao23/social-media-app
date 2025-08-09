import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Post = sequelize.define("Post",{
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        }
}, {
    timestamps: true,
})
export default Post;