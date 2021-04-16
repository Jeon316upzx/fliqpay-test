import { Router } from "express";
import { is_useragent }  from '../../middleware/is_useragent'
import { checktoken }  from '../../middleware/checktoken'
import { 
        closeSupportRequest ,
        commentOnSupportRequest,
        getcommentsPerSupportRequest ,
        getAllSupportRequests,
        generatePdfReport }  from './useragent.controller'


const Agentrouter = Router(); 

Agentrouter.post("/support-request/:id/close", checktoken , is_useragent , closeSupportRequest );
Agentrouter.post("/support-request/:id/comment", checktoken , is_useragent , commentOnSupportRequest  );
Agentrouter.get("/support-request/:id/comments", checktoken , is_useragent , getcommentsPerSupportRequest   );
Agentrouter.get("/support-requests", checktoken , is_useragent , getAllSupportRequests  );
Agentrouter.post("/generate-report", checktoken , is_useragent , generatePdfReport  );


export default Agentrouter;