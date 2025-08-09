import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Story = sequelize.define("Story", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
})
export default Story;