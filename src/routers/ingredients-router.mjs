import express from 'express';
import { fetchCalories, sendData, fetchIngredients, updateIngredientAmounts } from '../controllers/pizza-controller.mjs';

const ingredientsRouter = express.Router();

ingredientsRouter.route('/cals')
/**
 * @api {get} /api/ingredients/cals Get calories
 * @apiVersion 1.0.0
 * @apiName getCalories
 * @apiGroup Ingredients
 * @apiPermission all
 * 
 * @apiParam {String} id Ingredient name.
 * 
 * @apiSuccess {Number} calories Ingredient calories.
 * @apiSuccess {Number} carbs Ingredient carbs.
 * @apiSuccess {Number} protein Ingredient protein.
 * @apiSuccess {Number} fats Ingredient fats.
 * @apiSuccess {Number} price Ingredient price.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "calories": 100,
 *  "carbs": 10,
 *  "protein": 10,
 *  "fats": 10,
 *  "price": 10.00
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "not found"
 * }
 */
.get(fetchCalories);

ingredientsRouter.route('/')
/**
 * @api {get} /api/ingredients Get all ingredients
 * @apiVersion 1.0.0
 * @apiName getAllIngredients
 * @apiGroup Ingredients
 * @apiPermission all
 * 
 * @apiSuccess {Object[]} ingredients List of ingredients.
 * @apiSuccess {Number} ingredients.ingredient_id Ingredient ID.
 * @apiSuccess {String} ingredients.name Ingredient name.
 * @apiSuccess {Number} ingredients.portion_size Ingredient portion size.
 * @apiSuccess {Number} ingredients.calories Ingredient calories.
 * @apiSuccess {Number} ingredients.carbs Ingredient carbs.
 * @apiSuccess {Number} ingredients.protein Ingredient protein.
 * @apiSuccess {Number} ingredients.fats Ingredient fats.
 * @apiSuccess {Number} ingredients.price Ingredient price.
 * @apiSuccess {Number} ingredients.in_stock Ingredient in stock.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "ingredients": [
 *   {
 *    "ingredient_id": 1,
 *    "name": "cheese",
 *    "portion_size": 100,
 *    "calories": 100,
 *    "carbs": 10,
 *    "protein": 10,
 *    "fats": 10,
 *    "price": 10.00,
 *    "in_stock": 1000
 *    },
 *   {
 *    "ingredient_id": 2,
 *    "name": "tomato",
 *    "portion_size": 100,
 *    "calories": 100,
 *    "carbs": 10,
 *    "protein": 10,
 *    "fats": 10,
 *    "price": 10.00,
 *    "in_stock": 1000
 *   }
 * ]
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *  "error": "not found"
 * }
 */
.get(fetchIngredients)
/**
 * @api {post} /api/ingredients Add all pizza details including ingredients
 * @apiVersion 1.0.0
 * @apiName addPizzaDetails
 * @apiGroup Ingredients
 * @apiPermission user
 * 
 * @apiParam {Object} pizzaData Pizza details.
 * @apiParam {Number} pizzaData.user_id User ID.
 * @apiParam {String} pizzaData.dough Pizza dough.
 * @apiParam {String} pizzaData.size Pizza size.
 * @apiParam {String} pizzaData.message Pizza message.
 * @apiParam {Number} pizzaData.calories Pizza calories.
 * @apiParam {Number} pizzaData.carbs Pizza carbs.
 * @apiParam {Number} pizzaData.protein Pizza protein.
 * @apiParam {Number} pizzaData.fats Pizza fats.
 * @apiParam {Number} pizzaData.price Pizza price.
 * @apiParam {Number} pizzaData.quantity Pizza quantity.
 * @apiParam {Number} pizzaData.prompt_id Pizza prompt ID.
 * @apiParam {String[]} pizzaData.ingredients Pizza ingredients.
 * @apiParam {String} pizzaData.ingredients.name Pizza ingredient name.
 * 
 * @apiSuccess {Result} ResultSetHeader Result set header.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 Created
 * {
 *   {
 *     "fieldCount": 0,
 *     "affectedRows": 1,
 *     "insertId": 1,
 *     "info": "",
 *     "serverStatus": 2,
 *     "warningStatus": 0
 *     }
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": "bad request"
 * }
 * 
 */
.post(sendData);

ingredientsRouter.route('/:id')
/**
 * @api {put} /api/ingredients/:id Update ingredient amounts as admin
 * @apiVersion 1.0.0
 * @apiName updateIngredientAmounts
 * @apiGroup Ingredients
 * @apiPermission user
 * 
 * @apiParam {Number} id Ingredient ID.
 * @apiParam {Object} method Ingredient amount update method.
 * 
 * @apiSuccess {String} message Success message.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "updated successfully"
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 *  {
 *    "error": "no such ingredient exists"
 * }
 */
.put(updateIngredientAmounts);

export default ingredientsRouter;
