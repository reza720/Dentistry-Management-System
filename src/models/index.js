const Patient=require("./patient");
const Staff=require("./staff");
const Appointment=require("./appointment");
const Report=require("./report");
const Prescription=require("./prescription");
const Prescription_Item=require("./prescription_item");
const Payment=require("./payment");
const Purchase=require("./purchase");
const Purchase_Item=require("./purchase_item");
const Budget=require("./budget");

// Associations

Staff.hasMany(Appointment, {foreignKey:"staff_id"});
Appointment.belongsTo(Staff, {foreignKey:"staff_id"});
Patient.hasMany(Appointment, {foreignKey:"patient_id"});
Appointment.belongsTo(Patient, {foreignKey:"patient_id"});

Appointment.hasOne(Report, {foreignKey:"appointment_id"});
Report.belongsTo(Appointment, {foreignKey:"appointment_id"});

Appointment.hasOne(Prescription, {foreignKey:"appointment_id"});
Prescription.belongsTo(Appointment, {foreignKey:"appointment_id"});

Prescription.hasMany(Prescription_Item, {foreignKey:"prescription_id"});
Prescription_Item.belongsTo(Prescription, {foreignKey:"prescription_id"});

Appointment.hasOne(Payment, {foreignKey:"appointment_id"});
Payment.belongsTo(Appointment, {foreignKey:"appointment_id"});

Purchase.hasMany(Purchase_Item, {foreignKey:"purchase_id"});
Purchase_Item.belongsTo(Purchase, {foreignKey:"purchase_id"});

module.exports={
    Patient,
    Staff,
    Appointment,
    Report,
    Prescription,
    Prescription_Item,
    Payment,
    Purchase,
    Purchase_Item,
    Budget
};





