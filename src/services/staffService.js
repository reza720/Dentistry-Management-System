const { where } = require("sequelize");
const {Staff}=require("../models");

class StaffService{
    async createStaff(data){
        return Staff.create(data);
    }
    async getStaffs(){
        return Staff.findAll();
    }
    async getStaffById(id){
        const staff=await Staff.findByPk(id);
        if(!staff){
            const err= new Error("Staff not found");
            err.statusCode=404;
            throw err;
        }
        return staff;
    }
    async getStaffByName(name){
        const staffs=await Staff.findAll({where:{name:name}});
        if(staffs.length==0){
            const err=new Error("Staff not found");
            err.statusCode=404;
            throw err;
        }
        return staffs;
    }
    async getStaffByEmail(email){
        const staff=await Staff.findOne({where:{email:email}});
        if(!staff){
            const err=new Error("Staff not found");
            err.statusCode=404;
            throw err;
        }
        return staff;
    }
    async getStaffsBySalaryRange(from,to){
        const staffs=await Staff.findAll(where:{from,to});
    }
}