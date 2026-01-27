const {Op}=require("sequelize");
const {Staff}=require("../models");
const notFoundError=require("../utils/notFoundError");

class StaffService{
    //Creating Service
    async createStaff(data){
        return Staff.create(data);
    }
    // Reading Services
    // Generic
    async getStaffByFilter(filter={}){
        const staffs=await Staff.findAll({where:filter});
        if(staffs.length==0)notFoundError("staffs");
        return staffs;
    }

    async getStaffs(){
        return this.getStaffByFilter();
    }
    async getStaffById(id){
        const staff= await Staff.findByPk(id);
        if(!staff)notFoundError("staff");
        return staff;
    }
    async getStaffByName(name){
        return this.getStaffByFilter({name});
    }
    async getStaffByEmail(email){
        const staff=await Staff.findOne({where:{email}});
        if(!staff)notFoundError("staff");
        return staff;
    }
    async getStaffsBySalaryRange(from,to){
        return this.getStaffByFilter({
            salary:{[Op.gte]:from,[Op.lte]:to}
        });
    }
    async getStaffByStatus(status){
        return this.getStaffByFilter({status});
    }
    //Updating Service
    async updateStaff(id,data){
        const staff=await this.getStaffById(id);
        const allowedFields=["email", "phone", "salary", "status"];
        const updatedData={};

        for(let i=0; i<allowedFields.length;i++){
            if(data[allowedFields[i]] !==undefined){
                updatedData[allowedFields[i]]=data[allowedFields[i]];
            }
        }
        await staff.update(updatedData);
        return staff;
    }
}