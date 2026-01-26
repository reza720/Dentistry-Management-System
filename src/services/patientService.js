const {Patient}=require("../models");

class PatientService{
    async createPatient(data){
        return Patient.create(data);
    }
    async getPatients(){
        return Patient.findAll();
    }
    async getPatientById(id){
        const patient=await Patient.findByPk(id);
        if(!patient){
            const err=new Error("Patient not found");
            err.statusCode=404;
            throw err;
        }
        return patient;
    }
    async getPatientByName(name){
        const patients=await Patient.findAll({where:{name}});
        if(patients.length==0){
            const err=new Error("Patient not found");
            err.statusCode=404;
            throw err;
        }
        return patients;
    }
    async updatePhone(id,phone){
        const patient= await this.getPatientById(id);
        await patient.update({phone});
        return patient;
    }
}
module.exports=new PatientService();