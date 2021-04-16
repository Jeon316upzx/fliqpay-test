import express, { Application, Request, Response } from 'express'
import logger from './config/logger'
import config from './config/config'
import { rResponse } from "./constants/response";
import { HTTP } from './constants/statusCode'
import app from './app'




const port: any = config.SERVER_PORT || 3000



app.listen(port, function () {
    logger.info(`App is listening on port ${port} !`)
})