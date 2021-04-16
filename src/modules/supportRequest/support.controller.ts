import requestModel from '../../models/supportRequest.model'
import { Request , Response } from 'express'
import { rResponse } from '../../constants/response';
import { HTTP } from '../../constants/statusCode';
import config from '../../config/config';
import Joi from 'joi'



const createRequest = async (req: Request, res: Response ) => {

    const { issue } = req.body

    const newSupportRequest = new requestModel({
        made_by: req.body.made_by,
        issue: req.body.issue
    })

    newSupportRequest.save().then((response:any)=>{

        return res
        .status(HTTP.CREATED)
        .send({
            data: response,
            message: "Support request created successfully",
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



const getRequests = async (req: Request, res: Response ) => {
     
    const supportRequests = await requestModel.find({ made_by : req.body.made_by })

    return res
        .status(HTTP.OK)
        .send({
            data: {
                supportRequests: supportRequests
            },
            message: "Successful",
            status: rResponse.SUCCESS
        })


    
}

  export  {
      createRequest,
      getRequests
  }