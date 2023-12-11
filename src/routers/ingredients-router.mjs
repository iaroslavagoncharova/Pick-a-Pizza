import express from 'express';
import { fetchCalories, sendData, fetchIngredients } from '../controllers/pizza-controller.mjs';

const ingredientsRouter = express.Router();

ingredientsRouter.route('/cals').get(fetchCalories);

ingredientsRouter.route('/').get(fetchIngredients).post(sendData);

export default ingredientsRouter;
