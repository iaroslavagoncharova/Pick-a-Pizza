import express from 'express';
import { getSets, getDough } from '../controllers/pizza-controller.mjs';

const setRouter = express.Router();

setRouter.route('/:id')
// /**
//  * @api {get} /api/sets/:id Get prompt information
//  * @apiVersion 1.0.0
//  * @apiName GetSets
//  * @apiGroup Sets
//  * @apiPermission all
//  * 
//  * @apiParam {Number} id Media ID.
//  * 
//  * @apiSuccess {Object[]} comments List of comments.
//  * @apiSuccess {Number} comments.comment_id Comment ID.
//  * @apiSuccess {Number} comments.user_id User ID.
//  * @apiSuccess {Number} comments.media_id Media ID.
//  * @apiSuccess {String} comments.comment_text Comment text.
//  * @apiSuccess {String} comments.created_at Comment creation date.
//  * 
//  * @apiSuccessExample Success-Response:
//  * HTTP/1.1 200 OK
//  * {
//  *    "comment_id": 1,
//  *    "user_id": 1,
//  *    "media_id": 1,
//  *    "comment_text": "This is a comment",
//  *    "created_at": "2023-11-28T15:10:43.000Z"
//  * }, {
//  *    "comment_id": 2,
//  *    "user_id": 2,
//  *    "media_id": 1,
//  *    "comment_text": "This is another comment",
//  *    "created_at": "2023-11-28T15:10:43.000Z"
//  * }
//  * 
//  * @apiErrorExample Error-Response:
//  *   HTTP/1.1 404 Not Found
//  *  {
//  *    "error": "Not found",
//  *    "media_id": 999
//  * }
//  * 
//  */
.get(getSets);

setRouter.route('/dough/:name/:size').get(getDough);

export default setRouter;