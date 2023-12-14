import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const signinPageRouter = express.Router();

signinPageRouter
/**
 * @api {get} /api/sign-in Get login-register page
 * @apiVersion 1.0.0
 * @apiName getLoginRegisterPage
 * @apiGroup LoginRegister
 * @apiPermission all
 * 
 * @apiSuccess {Page} login-register Login-register page.
 * 
 */
.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login-register/login-register.html'));
  });

export default signinPageRouter;