import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { logOut } from '../controllers/auth-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoutRouter = express.Router();

logoutRouter.route('/').post(logOut);

export default logoutRouter;
