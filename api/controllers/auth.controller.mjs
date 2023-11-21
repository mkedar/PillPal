import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
import Hospital from "../models/hospital.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.mjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const signup = async (req, res, next) => {
  const {username, email, password} = req.body;
  const hashedPassword = bcryptjs.hashSync(password,10);
  const newUser = new User({ username, email, password: hashedPassword});
  try{
    await newUser.save()
    res.status(201).json("user created succesfully");
  } catch(error){
      if (error.code === 11000) {
        // Determine if the duplicate key is for the username, email, or both
        if (error.keyPattern.username && error.keyPattern.email) {
          // Both username and email are duplicate
          next(errorHandler(409, "Email is already in use"));
        } else if (error.keyPattern.username) {
          // Only the username is duplicate
          next(errorHandler(409, "Username is already taken"));
        } else if (error.keyPattern.email) {
          // Only the email is duplicate
          next(errorHandler(409, "Email is already in use"));
        }
      } else {
        // For other types of errors, pass them to the Express error-handling middleware
        next(error);
    }
  }
}

export const signin = async (req, res, next) => {

  const {email, password} = req.body;
  try {
    const validUser = await User.findOne({email}) || await Doctor.findOne({email});
    if (!validUser) return next(errorHandler(404, 'This email is not associated with an account'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword) return next(errorHandler(401, "Wrong credential"));
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
    const { password: pass, ...rest} = validUser._doc;
    res.cookie('access_token', token, {httpOnly: true, expires: new Date(Date.now() +24*60*60*1000)}).status(200).json(rest);
  } catch (error){
    next(error);
  }
}

export const google = async (req, res, next) => {
  try{
    const user = await User.findOne({email: req.body.email })
    if(user) {
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      const { password: pass, ...rest} = user._doc;
      res.cookie('access_token',token, {httpOnly:true}).status(200).json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({username: req.body.name.split(" ").join("".toLowerCase() + Math.random().toString(36).slice(-8)), email: req.body.email, password: hashedPassword, avatar: req.body.photo});
      await newUser.save();
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
      const {password: pass, ...rest} = newUser._doc;
      res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest);
    }
  } catch (error){
    next(error)
  }
};

export const signOut = async (req, res, next) => {
  try{
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch(error) {
    next(error);
  }
  
}


export const signupDoctor = async (req, res, next) => {
  const {username, email, password, hospitalID } = req.body;
  console.log('Received request body:', req.body);
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newDoctor = new Doctor({ username, email, password: hashedPassword, hospitalID});
  console.log('Received hospitalID:', hospitalID);
  try{
    const isValidHospital = await Hospital.findOne({ hospitalID });
    console.log('isValidHospital:', isValidHospital.hospitalID);
    if (!isValidHospital) {
      return next(errorHandler(400, 'Invalid hospital ID'));
    }
    await newDoctor.save()
    res.status(201).json("user created succesfully");
  } catch(error){
      if (error.code === 11000) {
        // Determine if the duplicate key is for the username, email, or both
        if (error.keyPattern.username && error.keyPattern.email) {
          // Both username and email are duplicate
          next(errorHandler(409, "Email is already in use"));
        } else if (error.keyPattern.username) {
          // Only the username is duplicate
          next(errorHandler(409, "Username is already taken"));
        } else if (error.keyPattern.email) {
          // Only the email is duplicate
          next(errorHandler(409, "Email is already in use"));
        }
      } else {
        // For other types of errors, pass them to the Express error-handling middleware
        next(error);
    }
  }
}