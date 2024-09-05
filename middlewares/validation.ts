//import request , respone and next form express
import { Request, Response, NextFunction } from "express";
//inprt yob for validate input from user 
import * as yup  from "yup";
import { Schema } from "yup";

//declaer itemSchema for validate data from yob
const itemSchema = yup.object().shape({
  name: yup.string().required(),
  //price must be number and positive 
  price: yup.number().required().positive(),
  
  category: yup.string().required(),
  //stock must be number interger and min > 0
  stock: yup.number().required().integer().min(0),
});

//daynamic Schema 




// export validate 

export const validateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //take data from user input and check what use input
  try {
    //abortEary : false is use for return eroror when use input wrong if we do not use it , it will return only one time if error again it will not show error
    await itemSchema.validate(req.body, { abortEarly: false });
    //if error pass data to groble error 
    //if not error it send require to midleware
    next();
    //we use catch for catch error 
  } catch (error: any) {
    // it will show state 404 when error input on api
    res.status(400).json({ error: error.message });
  }
};

