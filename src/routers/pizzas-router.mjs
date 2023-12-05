import express from 'express';
import { getPizzas } from '../controllers/shopping-cart-controller.mjs';

const pizzasRouter = express.Router();

pizzasRouter.route('/:id').get(getPizzas)

export default pizzasRouter;