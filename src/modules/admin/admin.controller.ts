import userModel from '../../models/user.model';
import requestModel from '../../models/supportRequest.model'
import commentModel from '../../models/comment.model'
import { Request , Response } from 'express'
import { rResponse } from '../../constants/response';
import { HTTP } from '../../constants/statusCode';

import Joi from 'joi'



const createAdmin = async (req: Request, res: Response ) => {

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
            message: "An Admin account with this email already exists",
            status: rResponse.FAIL
        })
    }

    const newuser = new userModel({
        firstname: firstname,
        lastname: lastname,
        email: email,
        usertype:"admin",
        password: password
    })

    newuser.save().then((result:any) =>{
        return res
        .status(HTTP.CREATED)
        .send({
            data: null,
            message: "Admin account created Successfully",
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


const createAgent = async (req: Request, res: Response ) => {

    const { 
        firstname , 
        lastname , 
        email,
        password } = req.body;

    const userexists = await userModel.findOne({ email  });

    if(userexists){
        return res
        .status(HTTP.CONFLICT)
        .send({
            data: null,
            message: "An Agent account with this email already exists",
            status: rResponse.FAIL
        })
    }

    const newuser = new userModel({
        firstname: firstname,
        lastname: lastname,
        email: email,
        usertype:"useragent",
        password: password
    })

    newuser.save().then((result:any) =>{
        return res
        .status(HTTP.CREATED)
        .send({
            data: null,
            message: "Agent account created Successfully",
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


const removeUser = async ( req: Request, res: Response ) => {

    const user_id = req.params.id

    await userModel.findOneAndDelete({ _id: req.params.id })
   .exec()
   .then(( result:any ) => {
    return res
            .status(HTTP.OK)
            .send({
                data: null,
                message: "Account successfully deleted",
                status: rResponse.SUCCESS
            })
   })
   .catch((err :any ) => {
            return res
            .status(HTTP.BAD_REQUEST)
            .send({
                data: null,
                message: "Sorry, deletion was not successful",
                status: rResponse.FAIL
            })
   });

}


const closeSupportRequest = async ( req: Request, res: Response ) => {

    const support_request_id = req.params.id

    const support_request = await requestModel.findOne({ _id: req.params.id })
    support_request.status = "closed"

    support_request.save()
   .then(( result:any ) => {
    return res
            .status(HTTP.OK)
            .send({
                data: null,
                message: "Support request closed successfully",
                status: rResponse.SUCCESS
            })
   })
   .catch((err :any ) => {
            return res
            .status(HTTP.BAD_REQUEST)
            .send({
                data: null,
                message: "Sorry, support request status change failed",
                status: rResponse.FAIL
            })
   });

}

const commentOnSupportRequest = async ( req: Request, res: Response ) => {

    const support_request_id = req.params.id
    
    const { comment } = req.body

    const newComment = new commentModel({
        made_by: req.body.made_by,
        support_request_id: support_request_id,
        comment: comment
    })

    const supportRequest = await requestModel.findOne({ _id : support_request_id })

    supportRequest.status = "addressed"

    newComment.save().then((response:any)=>{
       
        supportRequest.save()

        return res
        .status(HTTP.CREATED)
        .send({
            data: response,
            message: "New comment made successfully",
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

}


const getcommentsPerSupportRequest = async ( req: Request, res: Response ) => {

    const support_request_id = req.params.id

    const comments = await commentModel.find({ support_request_id: support_request_id })
    
    return res
        .status(HTTP.OK)
        .send({
            data: {
                comments: comments
            },
            message: "Success",
            status: rResponse.SUCCESS
        });

}

const getAllSupportRequests = async ( req: Request, res: Response ) => {


    const supportRequest = await requestModel.find({ })
    
    return res
        .status(HTTP.OK)
        .send({
            data: {
                supportRequest: supportRequest
            },
            message: "Success",
            status: rResponse.SUCCESS
        });

}



const getAllUsers = async ( req: Request, res: Response ) => {


    const users = await userModel.find({ })
    
    return res
        .status(HTTP.OK)
        .send({
            data: {
                users: users
            },
            message: "Success",
            status: rResponse.SUCCESS
        });

}


const getUser = async ( req: Request, res: Response ) => {

    const user_id = req.params.id

    let user = await userModel.findOne({ _id: req.params.id })

    return res
            .status(HTTP.OK)
            .send({
                data: {
                    user:user
                },
                message: "Success",
                status: rResponse.SUCCESS
            })
   
   

}



  export  {
      createAdmin,
      removeUser,
      createAgent,
      closeSupportRequest,
      commentOnSupportRequest,
      getcommentsPerSupportRequest,
      getAllSupportRequests,
      getAllUsers,
      getUser

  }