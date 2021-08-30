const mongoose = require("mongoose")


const Schema = mongoose.Schema

const employeeSchema = new Schema({

    user_name:{type:String,required:true},
    mail:{type:String,required:true},
    password: {type:String,required:true},
    role: {type:String,required: true},
    salaire:{type:String,required:true},
    num_tel: {type:String,required:true,length:8},
    city:{type:String,required: true}
    
})



const Employee= mongoose.model('employee',employeeSchema)
module.exports = Employee