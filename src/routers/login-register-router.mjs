import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const signinPageRouter = express.Router();

signinPageRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login-register/login-register.html'));
  });

export default signinPageRouter;