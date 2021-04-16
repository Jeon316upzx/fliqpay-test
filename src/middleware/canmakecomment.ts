import requestModel from '../models/supportRequest.model'
import { Request , Response , NextFunction } from 'express'
import { HTTP } from '../constants/statusCode'
import { rResponse } from '../constants/response'



export const canMakeComment = async (req:Request, res:Response, next:NextFunction) => {

  const support_request_id = req.params.id
  

  try {

    const supportRequest =  await requestModel.findOne({ _id: support_request_id })
    if (supportRequest.status == 'closed' || supportRequest.status == "new request"){
         return res.status(HTTP.INVALID_REQUEST).send({
            data: null,
            message: "Sorry, you can't comment on this support request at this time because an agent has not attended to it",
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