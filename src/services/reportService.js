const {Report, Appointment, Staff, Patient}=require("../models");
const notFoundError=require("../utils/notFoundError");

class ReportService{
    // Create Entity
    async createReport(data){
        const appointment=await Appointment.findByPk(data.appointment_id);
        if(!appointment)notFoundError("appointment");
        return Report.create(data);
    }
    // Read Entities
    // Generic Method
    async getReportBy(filter={}){
        const reports=await Report.findAll({where:filter, include:[
            {model:Appointment, attributes:["id","patient_id","staff_id","date"], include:[
                {model:Staff, attributes:["id","name"]},
                {model:Patient, attributes:["id","name"]}
            ]}
        ]});
        if(reports.length===0)notFoundError("reports");
        return reports;
    }
    // Public Methods
    async getReports(){ 
        return this.getReportBy();
    }
    async getReportById(id){
        const report=await Report.findByPk(id,{include:[
            {model:Appointment, attributes:["id","patient_id","staff_id","date"], include:[
                {model:Staff, attributes:["id","name"]},
                {model:Patient, attributes:["id","name"]}
            ]}
        ]});
        if(!report)notFoundError("report");
        return report;
    }
    async getReportByAppointment(appointment_id){
        return this.getReportBy({appointment_id});
    }
    // No update is allowed
    // No Delete is allowed
}
module.exports= new ReportService();