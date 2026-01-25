const sequelize=require("../config/database");
const {DataTypes}=require("sequelize");

const Report=sequelize.define("Report",{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    appointment_id:{type:DataTypes.INTEGER, allowNull:false},
    description:{type:DataTypes.TEXT, allowNull:false}
},{
    timestamps:true
});
module.exports=Report;
