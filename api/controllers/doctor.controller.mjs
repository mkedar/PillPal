import Doctor from "../models/doctor.model.js";
import { errorHandler } from "../utils/error.mjs";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({
      message: "API ROUTE IS WORKING",
    });
};

