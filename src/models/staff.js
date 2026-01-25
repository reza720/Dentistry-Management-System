const sequelize=require("../config/database");
const {DataTypes}=require("sequelize");

const Staff=sequelize.define("Staff",{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name:{type:DataTypes.STRING, allowNull:false},
    email:{type:DataTypes.STRING, allowNull:false, unique:true},
    phone:{type:DataTypes.STRING, allowNull:false},
    salary:{type:DataTypes.DECIMAL(10,2), allowNull:false},
    status:{type:DataTypes.ENUM("Active","On Break","Left"), defaultValue:"Active", allowNull:false}
},{ 
    timestamps:true
});
module.exports=Staff;