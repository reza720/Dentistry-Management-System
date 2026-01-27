const {Patient}=require("../models");
const notFoundError=require("../utils/notFoundError");

class PatientService{
    async createPatient(data){
        return Patient.create(data);
    }
    async getPatients(){
        return Patient.findAll();
    }
    async getPatientById(id){
        const patient=await Patient.findByPk(id);
        if(!patient) notFoundError("patient");
        return patient;
    }
    async getPatientByName(name){
        const patients=await Patient.findAll({where:{name}});
        if(patients.length==0)notFoundError("patients");
        return patients;
    }
    async updatePhone(id,phone){
        const patient= await this.getPatientById(id);
        await patient.update({phone});
        return patient;
    }
}
module.exports=new PatientService();