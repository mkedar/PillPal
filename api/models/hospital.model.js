import mongoose, { mongo } from "mongoose";

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  hospitalID: {
    type: String,
    required: true,
  },

}, {timestamps:true})

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;