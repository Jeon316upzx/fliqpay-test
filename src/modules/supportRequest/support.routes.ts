import { checktoken }  from '../../middleware/checktoken'
import { Router } from "express";
import { createRequest , getRequests }  from './support.controller'

const Requestrouter = Router();

Requestrouter.post("/create", checktoken,  createRequest );
Requestrouter.get("/requests", checktoken,  getRequests );

export default Requestrouter;