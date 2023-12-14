import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRatingUsernames, getRatings, postRatings } from '../controllers/rating-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ratingRouter = express.Router();

ratingRouter
/**
 * @api {get} /api/ratings Get ratings page
 * @apiVersion 1.0.0
 * @apiName getRatings
 * @apiGroup Ratings
 * @apiPermission all
 * 
 * @apiSuccess {Page} ratings Ratings page.
 */
.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/ratings/ratings.html'))
});
ratingRouter.route('/ratings')
/**
 * @api {get} /api/ratings/ratings Get ratings
 * @apiVersion 1.0.0
 * @apiName getRatings
 * @apiGroup Ratings
 * @apiPermission all
 * 
 * @apiSuccess {Object[]} reviews List of reviews.
 * @apiSuccess {Number} reviews.review_id Review ID.
 * @apiSuccess {String} reviews.review_text Review text.
 * @apiSuccess {Number} reviews.stars Number of rating stars.
 * @apiSuccess {Timestamp} reviews.created_at Review creation date.
 * @apiSuccess {Timestamp} reviews.edited_at Review update date.
 * @apiSuccess {Number} reviews.user_id User ID.
 * @apiSuccess {String} reviews.review_header Review header.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * {
 *  review_id: 1,
 *  review_text: 'Keto pizza was awesome! Will order again.',
 *  stars: 5,
 *  created_at: 2023-12-07T07:55:23.000Z,
 *  edited_at: 2023-12-07T08:43:46.000Z,
 *  user_id: 3,
 *  review_header: 'Delicious Pizza'
 *  },
 *  {
 *  review_id: 2,
 *  review_text: 'The restaurant is nice',
 *  stars: 5,
 *  created_at: 2023-12-07T08:28:34.000Z, 
 *  edited_at: 2023-12-07T08:28:34.000Z,
 *  user_id: 2,
 *  review_header: null
 *  }
 * }
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 * {
 * "error": "not found"
 * } 
 */
    .get(getRatings)
/**
 * @api {post} /api/ratings/ratings Post a rating
 * @apiVersion 1.0.0
 * @apiName postRatings
 * @apiGroup Ratings
 * @apiPermission user (self)
 * 
 * @apiParam {String} review_text Review text.
 * @apiParam {Number} stars Number of rating stars.
 * @apiParam {Number} user_id User ID.
 * @apiParam {String} review_header Review header.
 * 
 * @apiSuccess {Object} ResultSetHeader Result set header
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 Created
 * {
 *  ResultSetHeader: {
 *  fieldCount: 0,
 *  affectedRows: 1,
 *  insertId: 1,
 *  info: '',
 *  serverStatus: 2,
 *  warningStatus: 0
 *  changedRows: 0
 * }
 * }
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *   "error": "not found"
 * }
*/
.post(postRatings);

ratingRouter.route('/:id')
/**
 * @api {get} /api/ratings/:id Get rating usernames
 * @apiVersion 1.0.0
 * @apiName getRatingUsernames
 * @apiGroup Ratings
 * @apiPermission all
 * 
 * @apiParam {Number} user_id User ID.
 * 
 * @apiSuccess {Object[]} usernames List of usernames.
 * @apiSuccess {String} usernames.username Username.
 * 
 * @apiSuccessExample Success-Response:
 * 
 * HTTP/1.1 200 OK
 * {
 * {
 *  [{username: 'Juan'}],
 *  [{username: 'Anna'}],
 *  [{username: 'Slava'}]
 * }
 * }
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "not found"
 * }
 * 
 */
.get(getRatingUsernames);

export default ratingRouter;