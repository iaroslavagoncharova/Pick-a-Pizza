import express from 'express';
import { getPromptNames } from '../controllers/mainpage-controller.mjs';

const promptRouter = express.Router();

promptRouter.route('/').get(getPromptNames);

export default promptRouter;
