import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { postRegister } from '../controllers/auth-controller.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registRouter = express.Router();

registRouter.route('/')
/**
 * @api {post} /api/register Register a new user
 * @apiVersion 1.0.0
 * @apiName RegisterUser
 * @apiGroup Authentication
 * @apiPermission all
 * 
 * @apiParam {String} username Username.
 * @apiParam {String} password Password.
 * @apiParam {String} email Email.
 * @apiParam {String} address Address.
 * @apiParam {String} phone_number Phone number.
 * 
 * @apiSuccess {String} message Registration successful.
 * @apiSuccess {Object[]} user User.
 * @apiSuccess {Number} user.user_id User ID.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.password Password.
 * @apiSuccess {String} user.email Email.
 * @apiSuccess {String} user.address Address.
 * @apiSuccess {String} user.phone_number Phone number.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "message": "registration successful",
 *  "user": {
 *   "user_id": 1, 
 *   "username": "test",
 *   "password": "test",
 *   "email": "test@example.com",
 *   "address": "test",
 *   "phone_number": "123456789"
 * }
 * }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 * {
 *  "message": "an error occurred"
 *  }
 * 
 */
.post(postRegister);

export default registRouter;