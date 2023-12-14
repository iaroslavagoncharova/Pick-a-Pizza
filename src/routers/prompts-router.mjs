import express from 'express';
import { getPromptNames } from '../controllers/mainpage-controller.mjs';

const promptRouter = express.Router();

promptRouter.route('/')
/**
 * @api {get} /api/prompts Get prompt names
 * @apiVersion 1.0.0
 * @apiName getPromptNames
 * @apiGroup Prompts
 * @apiPermission all
 * 
 * @apiSuccess {Object[]} prompts_names List of prompt names.
 * @apiSuccess {String} prompts_names.prompt_name Prompt name.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  Pizza info [
 *  {prompt_name: 'Gluten Free'},
 *  {prompt_name: 'Low Calorie'},
 *  {prompt_name: 'Keto'},
 *  {prompt_name: 'Classic'},
 *  {prompt_name: 'Vegan Classic'}, 
 *  {prompt_name: 'Gluten Free Classic'},
 *  {prompt_name: 'Season Deal'}
 * ]
 * }
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *   "error": "not found"
 *  }
 */
.get(getPromptNames);

export default promptRouter;
