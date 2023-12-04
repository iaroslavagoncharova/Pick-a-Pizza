import express from 'express';
import { fetchCalories } from '../controllers/pizza-controller.mjs';
import { sendData } from '../controllers/pizza-controller.mjs';

const ingredientsRouter = express.Router();

ingredientsRouter.route('/').get(fetchCalories);

ingredientsRouter.route('/').post(sendData);

export default ingredientsRouter;
