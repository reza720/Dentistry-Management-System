const sequelize=require("../config/database");
const {DataTypes}=require("sequelize");

const Payment=sequelize.define("Payment",{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    appointment_id:{type:DataTypes.INTEGER, allowNull:false}
},{
    timestamps:true
});
module.exports=Payment;