import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    dialect:"mysql",
    port:process.env.PORT,
    host:procee.env.HOST,
    pool:{
        min:0,
        max:5,
        acquire:30000,
        idle:10000,
    },
    logging:true
})
export default sequelize;