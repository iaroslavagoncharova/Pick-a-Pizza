import express from 'express';
import { getSets } from '../controllers/pizza-controller.mjs';

const setRouter = express.Router();

setRouter.route('/:id').get(getSets);

export default setRouter;