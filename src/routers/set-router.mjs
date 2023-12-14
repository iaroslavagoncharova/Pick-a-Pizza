import express from 'express';
import { getSets, getDough } from '../controllers/pizza-controller.mjs';

const setRouter = express.Router();

setRouter.route('/:id')
/**
 * @api {get} /api/sets/:id Get pizza sets
 * @apiVersion 1.0.0
 * @apiName getSets
 * @apiGroup Pizza
 * @apiPermission all
 * 
 * @apiParam {Number} id Prompt ID.
 * 
 * @apiSuccess {Object[]} prompts List of prompt sets.
 * @apiSuccess {Number} prompt_id Prompt ID.
 * @apiSuccess {String} prompt_name Prompt name.
 * @apiSuccess {String} dough Prompt dough.
 * @apiSuccess {String} size Prompt size.
 * @apiSuccess {Object[]} ingredients List of ingredient names.
 * @apiSuccess {String} ingredients.name Ingredient name.
 * 
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  getSets {id: '3'}: [
 *  [
 *  {
 *      prompt_id: 3,
 *      prompt_name: 'Low Calorie',
 *      dough: 'usual',
 *      size: 'M'
 *  },
 *  ]
 *  rows3 [
 *  {"name": "tomato sauce"},
 *  {"name": "mozzarella"},
 *  {"name": "chicken"},
 *  {"name": "mushrooms"},
 *  {"name": "onions"}
 * ]
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 * {
 *  "error": "not found"
 * } 
 */
.get(getSets);

setRouter.route('/dough/:name/:size')
/**
 * @api {get} /api/sets/dough/:name/:size Get dough info
 * @apiVersion 1.0.0
 * @apiName getDough
 * @apiGroup Pizza
 * @apiPermission all
 * 
 * @apiParam {String} name Dough name.
 * @apiParam {String} size Dough size.
 * 
 * @apiSuccess {Object[]} dough All dough info.
 * @apiSuccess {Number} dough.dough_id Dough ID.
 * @apiSuccess {String} dough.dough_name Dough name.
 * @apiSuccess {String} dough.dough_size Dough size.
 * @apiSuccess {Number} dough.dough_price Dough price.
 * @apiSuccess {Number} dough.dough_calories Dough calories.
 * @apiSuccess {Number} dough.dough_carbs Dough carbs.
 * @apiSuccess {Number} dough.dough_protein Dough protein.
 * @apiSuccess {Number} dough.dough_fats Dough fat.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * dough: [
 * [
 * {
 *    dough_id: 8,
 *    dough_name: 'usual',
 *    dough_size: 'M',
 *    dough_price: '2.50',
 *    dough_calories: 900,
 *    dough_carbs: 165,
 *    dough_protein: 24,
 *    dough_fats: 15
 * }
 * ]
 * ]
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "not found"
 * }
 */
.get(getDough);

export default setRouter;