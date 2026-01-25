const sequelize=require("../config/database");
const {DataTypes}=require("sequelize");

const Patient=sequelize.define("Patient",{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name:{type:DataTypes.STRING, allowNull:false},
    phone:{type:DataTypes.STRING, allowNull:false}
},{
    timestamps:true,
    indexes:[
        {fields:["name"]}
    ]
});
module.exports=Patient;