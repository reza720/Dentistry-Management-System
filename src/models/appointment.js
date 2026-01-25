const sequelize=require("../config/database");
const {DataTypes}=require("sequelize");

const Appointment=sequelize.define("Appointment",{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    patient_id:{type:DataTypes.INTEGER, allowNull:false},
    staff_id:{type:DataTypes.INTEGER, allowNull:false},
    date:{type:DataTypes.DATEONLY, allowNull:false},
    status:{type:DataTypes.ENUM("Done","Pending","Cancelled"), defaultValue:"Pending", allowNull:false},
    cost:{type:DataTypes.DECIMAL(10,2), allowNull:false},
    isPaid:{type:DataTypes.BOOLEAN, defaultValue:false}
},{
    timestamps:true
});
module.exports=Appointment;