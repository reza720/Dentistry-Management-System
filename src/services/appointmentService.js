const {Staff,Patient,Appointment}=require("../models");
const {Op}=require("sequelize");
const notFoundError=require("../utils/notFoundError");

class AppointmentService{
    //create Entity
    async createAppointment(data){
        const [staff,patient]= await Promise.all([
            Staff.findByPk(data.staff_id),
            Patient.findByPk(data.patient_id)
        ]);
        
        if(!staff || staff.status!=="Active"){
            const err=new Error("Staff is not active or does not exist");
            err.statusCode=400;
            throw err;
        }
        if(!patient){
            const err=new Error("Patient does not exist");
            err.statusCode=400;
            throw err;
        }
        return Appointment.create(data);
    }

    //Read Entities
    // Generic method
    async getAppointmentBy(filter={}){
        const appointments=await Appointment.findAll({where:filter,include:[
            {model:Staff, attributes:["id","name"]},
            {model:Patient, attributes:["id","name","phone"]}
        ]});
        if(appointments.length===0)notFoundError("appointments");
        return appointments;
    }
    //Public methods
    async getAppointments(){
        return this.getAppointmentBy();
    }
    async getAppointmentById(id){
        const appointment= await Appointment.findByPk(id,{include:[
            {model:Staff, attributes:["id","name"]},
            {model:Patient, attributes:["id","name","phone"]}
        ]});
        if(!appointment)notFoundError("appointment");
        return appointment;
    }
    async getAppointmentsByPatient(patient_id){
        return this.getAppointmentBy({patient_id});
    }
    async getAppointmentsByStaff(staff_id){
        return this.getAppointmentBy({staff_id});
    }
    async getAppointmentsByAfterDate(date){
        return this.getAppointmentBy({
            date:{[Op.gte]:date}
        });
    }
    async getAppointmentsByBeforeDate(date){
        return this.getAppointmentBy({
            date:{[Op.lte]:date}
        });
    }
    async getAppointmentsByStatus(status){
        return this.getAppointmentBy({status});
    }
    async getIsPaidAppointments(isPaid){
        return this.getAppointmentBy({isPaid});
    }
    //Update Entity
    async updateAppointment(id,data){
        const appointment=await this.getAppointmentById(id);
        const allowedFields=["staff_id","status","isPaid"];
        const updatedAppointment={};

        for(let i=0; i<allowedFields.length; i++){
            if(data[allowedFields[i]]!==undefined){
                updatedAppointment[allowedFields[i]]=data[allowedFields[i]];
            }
        }
        await appointment.update(updatedAppointment);
        return appointment;
    }
    // Delete is not allowed
}
module.exports= new AppointmentService();

