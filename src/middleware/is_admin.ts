import userModel from '../models/user.model'
import { Request , Response , NextFunction } from 'express'
import { HTTP } from '../constants/statusCode'
import { rResponse } from '../constants/response'



export const is_admin = async (req:Request, res:Response, next:NextFunction) => {

  const { made_by } = req.body
  

  try {

    const user =  await userModel.findOne({ _id: made_by })
    if (user.usertype !== "admin"){
         return res.status(HTTP.INVALID_REQUEST).send({
            data: null,
            message: 'Unauthorized Access',
            status: rResponse.FAIL

          })
    }else{
      next()
    }

  } catch {
    res.status(HTTP.INVALID_REQUEST).send({
      data:null,
      message: 'Invalid request',
      status: rResponse.FAIL
    })
  }
};