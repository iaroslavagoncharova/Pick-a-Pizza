import express from 'express';
import { getOrderHistoryOfUser, getOrdersInProgress, removeOrder, setOrderAsCompleted } from '../controllers/orders-controller.mjs';

const orderRouter = express.Router();

orderRouter.route('/:id')
/**
 * @api {get} /api/order-data/:id Get order history of a user as a user
 * @apiVersion 1.0.0
 * @apiName GetOrderHistoryOfUser
 * @apiGroup Orders
 * @apiPermission user (self)
 * 
 * @apiParam {Number} id User ID.
 * 
 * @apiSuccess {Object[]} order_history List of orders.
 * @apiSuccess {Number} order_history.order_id Order ID.
 * @apiSuccess {Timestamp} order_history.order_timestamp Order timestamp.
 * @apiSuccess {Number} order_history.cart_price Cart price.
 * @apiSuccess {Number} order_history.cart_pizza_amount Amount of pizzas in cart.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "order_history": [
 *   {
 *    "order_id": 1,
 *    "order_timestamp": "2021-04-14T12:00:00.000Z",
 *    "cart_price": 10.00,
 *    "cart_pizza_amount": 2
 *  },
 *  {
 *    "order_id": 2,
 *    "order_timestamp": "2021-04-14T12:00:00.000Z",
 *    "cart_price": 10.00,
 *    "cart_pizza_amount": 2
 * }
 * ]
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "message": "an error occurred"
 * }
 * 
 */
.get(getOrderHistoryOfUser);
orderRouter.route('/wip/auth/:id')
/**
 * @api {get} /api/order-data/wip/auth/:id Get orders in progress as admin
 * @apiVersion 1.0.0
 * @apiName GetOrdersInProgress
 * @apiGroup Orders
 * @apiPermission admin
 * 
 * @apiParam {Number} id User ID (used to check if user is admin).
 * 
 * @apiSuccess {Object[]} orders List of orders.
 * @apiSuccess {Number} orders.order_id Order ID.
 * @apiSuccess {Timestamp} orders.order_timestamp Order timestamp.
 * @apiSuccess {Number} orders.cart_price Cart price.
 * @apiSuccess {Number} orders.cart_pizza_count Amount of pizzas in cart.
 * @apiSuccess {String} orders.user_name Username.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "orders": [
 *    {
 *     "order_id": 1,
 *     "order_timestamp": "2021-04-14T12:00:00.000Z",
 *     "cart_price": 10.00,
 *     "cart_pizza_count": 2,
 *     "user_name": "test"
 *    },
 *    {
 *     "order_id": 2,
 *     "order_timestamp": "2021-04-14T12:00:00.000Z",
 *     "cart_price": 10.00,
 *     "cart_pizza_count": 2,
 *     "user_name": "test"
 *   }
 * ]
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *    "message": "an error occurred"
 * }    
 * 
 */
.get(getOrdersInProgress)
/**
 * @api {put} /api/order-data/wip/auth/:id Set order as completed
 * @apiVersion 1.0.0
 * @apiName SetOrderAsCompleted
 * @apiGroup Orders
 * @apiPermission admin
 * 
 * @apiParam {Object} orderData Order data.
 * @apiParam {Number} orderData.order_id Order ID.
 * @apiParam {String} orderData.order_status Order status.
 * 
 * @apiSuccess {String} message PUT request successful.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "PUT request successful"
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 *  {
 *   "message": "bad request"
 * }
 */
.put(setOrderAsCompleted)
/**
 * @api {delete} /api/order-data/wip/auth/:id Delete order
 * @apiVersion 1.0.0
 * @apiName DeleteOrder
 * @apiGroup Orders
 * @apiPermission admin
 * 
 * @apiParam {Number} id Order ID.
 * 
 * @apiSuccess {String} message Order deleted successfully.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 204 No Content
 * {
 *  "message": "order deleted successfully"
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "message": "an error occurred"
 * }
 */
.delete(removeOrder);

export default orderRouter;