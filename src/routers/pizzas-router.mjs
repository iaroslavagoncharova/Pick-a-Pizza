import express from 'express';
import { getPizzas } from '../controllers/shopping-cart-controller.mjs';

const pizzasRouter = express.Router();

pizzasRouter.route('/:id')
/**
 * @api {get} /api/pizzas/:id Get all pizzas details by user id
 * @apiVersion 1.0.0
 * @apiName getPizzas
 * @apiGroup Pizzas
 * @apiPermission user (self)
 * 
 * @apiParam {Number} id User ID.
 * 
 * @apiSuccess {Object[]} pizzas List of pizza details.
 * @apiSuccess {Number} pizzas.pizza_id Pizza ID.
 * @apiSuccess (String) pizzas.dough Dough type.
 * @apiSuccess (String) pizzas.size Pizza size.
 * @apiSuccess {Number} pizzas.price Pizza price.
 * @apiSuccess {Number} pizzas.quantity Pizza quantity.
 * @apiSuccess {String} pizzas.ingredientIds Ingredient IDs.
 * @apiSuccess {String} pizzas.ingredient names Ingredient names.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *    pizzas: [
 *    {
 *      pizza_id: 1,
 *      dough: 'usual',
 *      size: 'M',
 *      price: 12.00,
 *      quantity: 2,
 *      ingredientIds: [1, 2, 3],
 *      ingredient names: ['cheese', 'tomato', 'ham']
 *   },
 *  {
 *     pizza_id: 2,
 *     dough: 'keto',
 *     size: 'L',
 *     price: 15.00,
 *     quantity: 1,
 *     ingredientIds: [1, 2],
 *     ingredient names: ['cheese', 'tomato']
 * }
 * ]
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "error": "not found"
 * }
 * 
 */
.get(getPizzas);


export default pizzasRouter;