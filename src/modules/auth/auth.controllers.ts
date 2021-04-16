import userModel from '../../models/user.model';
import { Request , Response } from 'express'
import { rResponse } from '../../constants/response';
import { HTTP } from '../../constants/statusCode';
import bcrypt from 'bcryptjs'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import config from '../../config/config'


const register = async (req: Request, res: Response ) => {

    const { 
            firstname , 
            lastname , 
            email,
            password } = req.body;


    console.log(req.body)


    const userSchema = Joi.object().keys({ 
                firstname: Joi.string().required(),
                lastname: Joi.string().required(), 
                email: Joi.string().email().required(),
                password: Joi.string().required().min(5)
              });

    const result = userSchema.validate(req.body); 
    const { value, error } = result; 
    const valid = error == null; 

    if (!valid) { 
        res.status(HTTP.MISSING_PARAMS).json({ 
        message: 'Oops! Some required fields are missing', 
        data: req.body 
    }) 
    }

    const userexists = await userModel.findOne({ email  });

    if(userexists){
        return res
        .status(HTTP.CONFLICT)
        .send({
            data: null,
            message: "An account with this email already exists",
            status: rResponse.FAIL
        })
    }

    const newuser = new userModel({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    })

    newuser.save().then((result:any) =>{
        return res
        .status(HTTP.CREATED)
        .send({
            data: null,
            message: "Account created Successfully",
            status: rResponse.SUCCESS
        })
    }).catch((error:any)=>{
        return res
        .status(HTTP.BAD_REQUEST)
        .send({
            data: error,
            message: error.message,
            status: rResponse.ERROR
        })
    })
    
  };




const login = async (req: Request, res: Response ) => {

    const { email, password } = req.body;

    const loginSchema = Joi.object().keys({ 
        email: Joi.string().email().required(),
        password: Joi.string().required().min(5)
      });

        const result = loginSchema.validate(req.body); 
        const { value, error } = result; 
        const valid = error == null; 

        if (!valid) { 
            res.status(HTTP.MISSING_PARAMS).json({ 
            message: 'Oops! Some required fields are missing', 
            data: req.body 
            }) 
        }


    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(HTTP.NOT_FOUND).send({
        data: null,
        message: "Account with this email address does not exist.",
        status: rResponse.FAIL
      });
    }
  
  
    const Isvalidpass = await bcrypt.compare(password, user.password);
    if (!Isvalidpass) {
      return res.status(HTTP.BAD_REQUEST).send({
        data:null,
        message: "Password is incorrect",
        status: rResponse.FAIL
      });
    }
  
    const token = jwt.sign(
      { _id: user._id },
      config.JWT_TOKEN_KEY
    );

    return res.status(200).send({
      data:{
          token: token,
          user: user
      },
      message: "Login successful",
      status: rResponse.SUCCESS
    });

    
    
  };

  export  {
      register,
      login
  }