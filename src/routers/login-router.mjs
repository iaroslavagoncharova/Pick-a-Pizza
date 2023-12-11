import express from 'express';
import { postLogin } from '../controllers/auth-controller.mjs';

const loginRouter = express.Router();

loginRouter.route('/').post(postLogin);

export default loginRouter;

