import Doctor from "../models/doctor.model.js";
import { errorHandler } from "../utils/error.mjs";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({
      message: "API ROUTE IS WORKING",
    });
};

export const updateDoctor = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      }
    }, { new: true });

    if (!updatedDoctor) {
      // Handle the case when the doctor is not found
      return next(errorHandler(404, 'Doctor not found.'));
    }

    const { password, ...rest } = updatedDoctor._doc;

    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
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

