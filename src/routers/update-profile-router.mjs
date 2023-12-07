import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { putUser, putPassword } from '../controllers/user-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updateRouter = express.Router();

updateRouter.route('/').put(putUser);
updateRouter.route('/password').put(putPassword);

export default updateRouter;
