const sequelize=require("../config/database");
const {DataTypes}=require("sequelize");

const Budget=sequelize.define("Budget",{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name:{type:DataTypes.STRING, defaultValue:"Budget"},
    amount:{type:DataTypes.DECIMAL(10,2), allowNull:false}
},{
    timestamps:true
});

module.exports=Budget;