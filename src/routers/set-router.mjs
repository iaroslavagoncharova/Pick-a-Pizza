import express from 'express';
import { getSets, getDough } from '../controllers/pizza-controller.mjs';

const setRouter = express.Router();

setRouter.route('/:id').get(getSets);

setRouter.route('/dough/:name/:size').get(getDough);

export default setRouter;