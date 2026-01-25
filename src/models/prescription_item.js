const sequelize=require("../config/database");
const {DataTypes}=require("sequelize");

const Prescription_Item=sequelize.define("Prescription_Item",{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    prescription_id:{type:DataTypes.INTEGER, allowNull:false},
    item:{type:DataTypes.STRING, allowNull:false}
},{
    timestamps:true
});
module.exports=Prescription_Item;
