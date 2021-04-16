import commentModel from '../../models/comment.model'
import { Request , Response } from 'express'
import { rResponse } from '../../constants/response';
import { HTTP } from '../../constants/statusCode';
import config from '../../config/config';
import Joi from 'joi'



const makeComment = async (req: Request, res: Response ) => {
    
    const support_request_id = req.params.id

    console.log(support_request_id)

    const { comment } = req.body

    const newComment = new commentModel({
        made_by: req.body.made_by,
        support_request_id: support_request_id,
        comment: comment
    })

    newComment.save().then((response:any)=>{

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



const getComments = async (req: Request, res: Response ) => {

    const support_request_id = req.params.id
     
    const comments = await commentModel.find({ support_request_id: support_request_id })

    return res
        .status(HTTP.OK)
        .send({
            data: {
                comments: comments
            },
            message: "Successful",
            status: rResponse.SUCCESS
        })


    
}

  export  {
      makeComment,
      getComments
  }