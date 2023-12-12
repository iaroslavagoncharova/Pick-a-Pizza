import express from 'express';
import { fetchCalories, sendData, fetchIngredients, updateIngredientAmounts } from '../controllers/pizza-controller.mjs';

const ingredientsRouter = express.Router();

ingredientsRouter.route('/cals').get(fetchCalories);

ingredientsRouter.route('/').get(fetchIngredients).post(sendData);

ingredientsRouter.route('/:id').put(updateIngredientAmounts);

export default ingredientsRouter;
