import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { postRegister } from '../controllers/auth-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registRouter = express.Router();

registRouter.route('/').post(postRegister);

export default registRouter;