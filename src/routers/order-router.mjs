import express from 'express';
import { getOrderHistoryOfUser, getOrdersInProgress, removeOrder, setOrderAsCompleted } from '../controllers/orders-controller.mjs';

const orderRouter = express.Router();

orderRouter.route('/:id').get(getOrderHistoryOfUser);
orderRouter.route('/wip/auth/:id').get(getOrdersInProgress).put(setOrderAsCompleted).delete(removeOrder);

export default orderRouter;