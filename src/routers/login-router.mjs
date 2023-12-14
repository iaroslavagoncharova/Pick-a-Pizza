import express from 'express';
import { postLogin } from '../controllers/auth-controller.mjs';

const loginRouter = express.Router();

loginRouter.route('/')
/**
 * @api {post} /api/login Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission user
 * 
 * @apiParam {Object} userCreds User credentials.
 * @apiParam {String} userCreds.email User email.
 * @apiParam {String} userCreds.password User password.
 * 
 * @apiSuccess {String} message Success message.
 * @apiSuccess {String} token Token.
 * @apiSuccess {Object} user User object.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "logged in",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "user": {
 *    "user_id": 1,
 *    "username": "Juan",
 *    "password": "1234",
 *    "email": "juan@example.com",
 *    "address": "1234 Example Street",
 *    "favorite_pizza": "Keto",
 *    "phone_number": "123456789",
 *    "user_level_id": 2,
 *    "created_at": "2021-04-14T12:00:00.000Z"
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *   "message": "invalid username/password"
 * }
 */
.post(postLogin);

export default loginRouter;

