import { checktoken }  from '../../middleware/checktoken'
import { Router } from "express";
import { makeComment, getComments }  from './comment.controller'
import { canMakeComment }  from '../../middleware/canmakecomment'

const Commentsrouter = Router();
 
Commentsrouter.post("/:id/create-comment", checktoken, canMakeComment, makeComment );
Commentsrouter.get("/:id/comments", checktoken,  getComments );

export default Commentsrouter; 