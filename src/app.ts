//packages
import express ,{ Application , Request , Response }from "express";
import bodyParser from "body-parser";
import config  from "./config/config";
import { rResponse } from "./constants/response";
import morgan from "morgan";

import routes from './modules/namespace.routes'
import { HTTP } from "./constants/statusCode";
import logger from "./config/logger";


//Seed database with fake data including a customer, user-agent and admin
// import { seedDB } from './seeder/seeder'
// seedDB()



//Initialize database
import db from './config/database'
db

//Initialize Express App
const app: Application = express();


//Initialize Express Body Parser and Dev logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));





const apiURL = `/fliqpay/api/${config.API_VERSION}`;

app.use(apiURL, routes());
export default app;