import express from 'express';
import { putUser, putPassword } from '../controllers/user-controller.mjs';


const updateRouter = express.Router();

updateRouter.route('/').put(putUser);
updateRouter.route('/password').put(putPassword);

export default updateRouter;
