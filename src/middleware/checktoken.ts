import jwt from 'jsonwebtoken'
import config from '../config/config'
import { Request , Response , NextFunction } from 'express'
import { HTTP } from '../constants/statusCode'
import { rResponse } from '../constants/response'

export const checktoken = (req:Request, res:Response, next:NextFunction) => {

  try {
    let token:any= '';
    if(req.headers.authorization){
        token = req.headers.authorization.split(' ')[1]
    }
    console.log(req.params)
    const decodedToken:any = jwt.verify(token, config.JWT_TOKEN_KEY);
    
    const userId = decodedToken.userId;
    req.body.made_by = decodedToken._id

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(HTTP.INVALID_REQUEST).send({
      data: null,
      message: 'Invalid request',
      status: rResponse.ERROR
    })
  }
};