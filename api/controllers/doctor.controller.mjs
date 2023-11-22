import Doctor from "../models/doctor.model.js";
import { errorHandler } from "../utils/error.mjs";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({
      message: "API ROUTE IS WORKING",
    });
};

export const deleteDoctor = async (req, res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account'));
  try{
    await Doctor.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  }catch (error){
    console.error('Error deleting doctor:', error);
    res.status(500).json('An error occurred while deleting the doctor.');
  }
}

