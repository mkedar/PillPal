import User from "../models/user.model.js";
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
    next(error);
  }
}

export const signin = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const validUser = await User.findOne({email});
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