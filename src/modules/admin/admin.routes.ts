import { Router } from "express";
import { createAdmin , 
         removeUser , 
         createAgent ,
         closeSupportRequest ,
         commentOnSupportRequest,
         getcommentsPerSupportRequest ,
         getAllSupportRequests,
         getAllUsers,
         getUser }  from './admin.controller'
import { is_admin }  from '../../middleware/is_admin'
import { checktoken }  from '../../middleware/checktoken'


const Adminrouter = Router();

Adminrouter.post("/create-admin", createAdmin);
Adminrouter.post("/create-user-agent", checktoken, is_admin,  createAgent);
Adminrouter.post("/delete-user/:id", checktoken , is_admin , removeUser );
Adminrouter.get("/users", checktoken , is_admin , getAllUsers );
Adminrouter.get("/users/:id", checktoken , is_admin , getUser );
Adminrouter.post("/support-request/:id/close", checktoken , is_admin , closeSupportRequest );
Adminrouter.post("/support-request/:id/comment", checktoken , is_admin , commentOnSupportRequest  );
Adminrouter.get("/support-request/:id/comments", checktoken , is_admin , getcommentsPerSupportRequest  );
Adminrouter.get("/support-requests", checktoken , is_admin , getAllSupportRequests  );


export default Adminrouter;