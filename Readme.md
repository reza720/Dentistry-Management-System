# Dentistry Management System
This system manages operations related to a dental clinic.  

## Actors
- Admin
- Staff

## Use Cases
### Admin Use Cases
- Manage purchases
- Manage staff
- Manage finances:
  - Patient payments
  - Purchase payments
  - Staff salaries

### Staff Use Cases
- Manage patients
- Manage appointments
- Manage reports
- Manage prescriptions

## Main Workflows
### Patient Treatment Workflow
- A patient is registered in the system
- The first appointment is scheduled
- After the first appointment:
  - A report is created by a staff member
  - A prescription is issued if required
- If additional treatment is needed:
  - More appointments are scheduled
  - A new report is added after each appointment
  - A new Prescription is added if necessary
- The patient can:
  - Pay after each appointment

### Dentistry Setup Workflow
- Hire staff
- Purchase required supplies
- Manage finances:
  - Income (patient payments)
  - Expenses (staff salaries, purchases)

## Objects, Their Fields, Constrains, Indexes, validations

**Patient**:  
- id: auto, primary key  
- name: not null, indexed, letters and space only, not Empty  
- phone: not null, only numbers, length 10, not Empty  
- timestamp: true  

**Staff**  
- id: auto, primary key  
- name: not null, letters and space only, not Empty  
- email: not null, unique, valid email  
- phone: not null, only numbers, length 10, not Empty  
- salary: not null, min=0  
- status: enum("Active", "On Break", "Left") default: Active, validate if it is one of the values  
- timestamp: true  

**Appointment**  
- id: auto, primary key  
- patient_id: not null  
- staff_id: not null  
- date: not null, valid date, default now  
- status: enum("Done", "Pending", "Cancelled") default: Pending, validate if it is one of the values  
- cost: not null, cost >=0  
- isPaid: Boolean, default: false, validate if it is one of the values, auto change by payment  
- timestamp: true  

**Report**  
- id: auto, primary key  
- appointment_id: not null  
- description: not null  
- timestamp: true  

**Prescription**  
- id: auto, primary key  
- appointment_id: not null  
- items: **Prescription-Item** junction table with one owner  
- timestamp: true  

**Prescription_Item**  
- id: auto, primary key  
- prescription_id: not null  
- item: not null, not empty  
- timestamp: true  

**Payment**  
- id: auto, primary key  
- appointment_id: not null  
- timestamp: true  

**Purchase**  
- id: auto, primary key  
- date: not null, valid date  
- items: **Purchase_Item** junction table with one owner  
- total_paid: not null, auto filled by purchase items  
- timestamp: true  

**Purchase_Item**  
- id: auto, primary key  
- purchase_id: not null  
- item: not null, not empty  
- quantity: not null, min>0  
- unit_price: not null, min>0  
- total_price: not null, auto fill by unit_price * quantity  
- timestamp: true  

**Budget**  
- name: Budget  
- amount: default: 0; added by patient payment, cut by salaries every 30 days, and cut by each purchase

## Relationship of Objects

- Staff & Patient -> Appointment (1:n)  
- Appointment -> Report (1:0..1)  
- Appointment -> Prescription (1:0..1)  
- Prescription -> Prescription-Item (1:n)  
- Appointment -> Payment (1:0..1)  
- Purchase -> Purchase_Item (1:n)

## Business Rules:
**PatientService**
  - CRUD: Create, read: id, name, all, update:only phone number, delete: no 

**StaffService**
  - CRUD: create, read: id, name, email, salary, status, update: email, phone, salary, status 

**AppointmentService**
  - Schedule, update, cancel appointments  
  - Validate date, patient_id, staff_id  
  - Change status (Pending, Done, Cancelled)  
  - Track payment status  
  - Link with Reports and Prescriptions  

**ReportService**
  - Create and update reports for appointments  
  - Fetch reports by patient or appointment  


**PrescriptionService**
  - Create, update, read prescriptions  
  - **Add, update, remove Prescription-Items** inside the same service  
  - Fetch prescriptions by patient or appointment  

**PatientPaymentService**
  - Record payment linked to patient and appointment  
  - Update **Budget** automatically  
  - Validate amounts  
  - Automatically mark appointment as `isPaid = Yes`  

**PurchaseService**
  - Record purchase with **Purchase_Items**  
  - Add, update, remove purchase items inside the same service  
  - Calculate `total_paid` automatically  
  - Update **Budget** automatically  

**BudgetService**
  - Track total money (`amount`)  
  - Update amount on:
    - Patient payment  
    - Salary payout (every 30 days)  
    - Purchase  
  - Generate budget reports  
