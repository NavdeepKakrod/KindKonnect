import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  email: { 
    type: String,required:true,
    unique: true 
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type:String,
    required:true,
    minlength:10
  },
  address: {
    type:String,
    required:true
  },
  description: {
    type:String
  },
  isVerified: { 
    type: Boolean, 
    default: false 
},
}, { timestamps: true });
 
const NGO = mongoose.model("NGO",ngoSchema);

export default NGO;