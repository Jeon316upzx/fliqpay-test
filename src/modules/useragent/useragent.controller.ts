import requestModel from '../../models/supportRequest.model'
import commentModel from '../../models/comment.model'
import { Request , Response } from 'express'
import { rResponse } from '../../constants/response';
import { HTTP } from '../../constants/statusCode';
import moment from 'moment'
import PDFDocument from 'pdfkit'
import fs from 'fs'


const closeSupportRequest = async ( req: Request, res: Response ) => {

    const support_request_id = req.params.id

    const support_request = await requestModel.findOne({ _id: req.params.id })
    support_request.status = "closed"
    support_request.closed_on = new Date()
    support_request.addressed_by = req.body.made_by

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


const generatePdfReport = async ( req: Request, res: Response ) => {

    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream('report.pdf'));
    
    const supportRequest = await requestModel.find({
        closed_on:{
            $gte: moment().add(-30, "days"),
        }
     })
      
     pdfDoc.text(`Support Request Issue                          Closed On`)
     pdfDoc.moveDown(2)
     supportRequest.forEach( (element:any) => {
        pdfDoc.text(`${element.issue}                           ${ element.closed_on}`)
        pdfDoc.moveDown(1)

     });
     pdfDoc.end();


    
    return res
        .status(HTTP.OK)
        .send({
            data: {
                supportRequest: supportRequest
            },
            message: "Document generated successfully",
            status: rResponse.SUCCESS
        });
     
}


  export  {
      closeSupportRequest,
      commentOnSupportRequest,
      getcommentsPerSupportRequest,
      getAllSupportRequests,
      generatePdfReport
  }