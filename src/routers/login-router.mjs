import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { postLogin } from '../controllers/auth-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loginRouter = express.Router();

loginRouter.route('/').post(postLogin);

export default loginRouter;

