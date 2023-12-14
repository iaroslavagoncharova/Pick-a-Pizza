import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRatingUsernames, getRatings, postRatings } from '../controllers/rating-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ratingRouter = express.Router();

ratingRouter
// /**
//  * @api {get} /api/sets/:id Get prompt information
//  * @apiVersion 1.0.0
//  * @apiName GetSets
//  * @apiGroup Sets
//  * @apiPermission all
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
.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/ratings/ratings.html'))
});
ratingRouter.route('/ratings')
    .get(getRatings)
    .post(postRatings);

ratingRouter.route('/:id').get(getRatingUsernames);

export default ratingRouter;