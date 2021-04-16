import { Router } from "express";

import Authrouter from './auth/auth.routes';
import Requestrouter from './supportRequest/support.routes';
import Commentsrouter from './comments/comment.routes';
import Adminrouter from './admin/admin.routes';
import Agentrouter from './useragent/useragent.routes';


export default function routes() {

  const router = Router();
  //Authentication Router Namespace
  router.use("/auth", Authrouter);
  router.use("/support-requests", Requestrouter)
  router.use("/support-request", Commentsrouter)
  router.use("/admin", Adminrouter)
  router.use("/agent", Agentrouter)

  return router;
}
