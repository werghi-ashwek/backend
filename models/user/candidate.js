const mongoose = require("mongoose")


const Schema = mongoose.Schema

const candidateSchema = new Schema({

    user_name:{type:String,required:true},
    password: {type:String,required:true},
    role: {type:String,required: true},
    age:{type:String,required:true},
    num_tel: {type:String,required:true,length:8},
    type_permis:{type:String,required: true},
    categorie_permis:{type:String,required: true},
    city:{type:String,required: true},
    paye:{type:String,required: true},
    date_exam:{type:String,required: true},
    prix:{type:String,required: true}
})



const Candidate = mongoose.model('candidate',candidateSchema)
module.exports = Candidate
