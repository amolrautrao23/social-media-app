import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Relationship = sequelize.define("Relationship", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
})
export default Relationship;