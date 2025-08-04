import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    dialect:"mysql",
    port:process.env.DB_PORT,
    host:process.env.HOST,
    pool:{
        min:0,
        max:5,
        acquire:30000,
        idle:10000,
    },
    logging:false
})
// const sequelize = new Sequelize("social-media-app","root","",{
//     dialect:"mysql",
//     port:3306,
//     host:"localhost",
//     pool:{
//         min:0,
//         max:5,
//         acquire:30000,
//         idle:10000,
//     },
//     logging:false
// })
export default sequelize;