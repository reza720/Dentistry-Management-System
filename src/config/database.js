const {Sequelize}=require("sequelize");

const sequelize=new Sequelize(
    "Dentistry_Management_System",
    "root",
    "root",{
        host:"localhost",
        dialect:"mysql",
        logging:false
    }
);
module.exports=sequelize;