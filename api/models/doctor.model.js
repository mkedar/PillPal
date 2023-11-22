import mongoose, { mongo } from "mongoose";

const doctorSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  },
  hospitalID: {
    type: String,
    required: true,
  },

}, {timestamps:true})

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;