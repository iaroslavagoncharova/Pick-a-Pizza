import express from 'express';
import { listUsers, putUser, putPassword, deleteUser, grantAdminPrivileges } from '../controllers/user-controller.mjs';

const userRouter = express.Router();

userRouter.route('/')
/**
 * @api {get} /api/users Get all users
 * @apiVersion 1.0.0
 * @apiName getAllUsers
 * @apiGroup Users
 * @apiPermission admin
 * 
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.user_id User ID.
 * @apiSuccess {String} users.username Username.
 * @apiSuccess {String} users.password Password.
 * @apiSuccess {String} users.email Email.
 * @apiSuccess {String} users.address Address.
 * @apiSuccess {String} users.favorite_pizza Favorite pizza.
 * @apiSuccess {String} users.phone_number Phone number.
 * @apiSuccess {Number} users.user_level_id User level ID.
 * @apiSuccess {Timestamp} users.created_at User creation date.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
    user_id: 1,
    username: 'Anna',
    password: 'password123',
    email: 'anna@example.com',
    address: 'Karaportti 2, Espoo',
    favorite_pizza: 'Classic',
    phone_number: '123456789',
    user_level_id: 1,
    created_at: 2023-11-14T10:48:00.000Z
  },
  {
    user_id: 2,
    username: 'Slava',
    password: 'securepass',
    email: 'slava@example.com',
    address: 'Karaportti 2, Espoo',
    favorite_pizza: 'Low Calorie',
    phone_number: '987654321',
    user_level_id: 1,
    created_at: 2023-11-14T11:30:00.000Z
  },
  {
    user_id: 3,
    username: 'Juan',
    password: 'pass123',
    email: 'juan@example.com',
    address: 'Karaportti 2, Espoo',
    favorite_pizza: 'Keto',
    phone_number: '5556667',
    user_level_id: 2,
    created_at: 2023-11-14T12:15:00.000Z
  }
 * @apiErrorExample Error-Response:
    *   HTTP/1.1 404 Not Found
    * {
    * "message": "an error occurred"
    * }
 * 
 */
.get(listUsers)
userRouter.route('/update')
/**
 * @api {put} /api/users/update Update user
 * @apiVersion 1.0.0
 * @apiName putUser
 * @apiGroup Users
 * @apiPermission user (self)
 * 
 * @apiParam {String} username Username.
 * @apiParam {String} email Email.
 * @apiParam {String} address Address.
 * @apiParam {String} phone_number Phone number.
 * 
 * @apiSuccess {Object[]} user User.
 * @apiSuccess {Number} user.user_id User ID.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.password Password.
 * @apiSuccess {String} user.email Email.
 * @apiSuccess {String} user.address Address.
 * @apiSuccess {String} user.favorite_pizza Favorite pizza.
 * @apiSuccess {String} user.phone_number Phone number.
 * @apiSuccess {Number} user.user_level_id User level ID.
 * @apiSuccess {Timestamp} user.created_at User creation date.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "message": "updated successfully",
 * "user": {
    user_id: 1,
    username: 'Anna',
    password: 'password123',
    email: 'anna@example.com',
    address: 'Karaportti 2, Espoo',
    favorite_pizza: 'Classic',
    phone_number: '123456789',
    user_level_id: 1,
    created_at: 2023-11-14T10:48:00.000Z
 }
  }
 * @apiErrorExample Error-Response:
    *   HTTP/1.1 400 Bad Request
    * {
    * "message": "an error occurred"
    * }
 * 
 */
.put(putUser);
userRouter.route('/update/password')
/**
 * @api {put} /api/users/update/password Update password
 * @apiVersion 1.0.0
 * @apiName putPassword
 * @apiGroup Users
 * @apiPermission user (self)
 * 
 * @apiSuccess {Message} message Password updated successfully.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "message": "updated successfully"
 * }
 * @apiErrorExample Error-Response:
    *   HTTP/1.1 400 Bad Request
    * {
    * "message": "an error occurred"
    * }
 * 
 */
.put(putPassword);
userRouter.route('/delete/:id')
/**
 * @api {delete} /api/users/delete/:id Delete user
 * @apiVersion 1.0.0
 * @apiName deleteUser
 * @apiGroup Users
 * @apiPermission user (self), admin
 * 
 * @apiSuccess {Message} message User deleted successfully.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 204 No Content
 * {
 * "message": "user deleted successfully"
 * }
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 404 Not Found
 * {
 * "message": "an error occurred"
 * }
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 * {
 * "message": "unauthorized"
 * }
 * 
 */
.delete(deleteUser);
userRouter.route('/grant-admin/:id')
/**
 * @api {put} /api/users/grant-admin/:id Grant admin privileges
 * @apiVersion 1.0.0
 * @apiName grantAdminPrivileges
 * @apiGroup Users
 * @apiPermission admin
 * 
 * @apiSuccess {Message} message Updated successfully.
 * @apiSuccess {Object[]} user User.
 * @apiSuccess {Number} user.user_id User ID.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.password Password.
 * @apiSuccess {String} user.email Email.
 * @apiSuccess {String} user.address Address.
 * @apiSuccess {String} user.favorite_pizza Favorite pizza.
 * @apiSuccess {String} user.phone_number Phone number.
 * @apiSuccess {Number} user.user_level_id User level ID.
 * @apiSuccess {Timestamp} user.created_at User creation date.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "message": "updated successfully",
 * "user": {
 *      user_id: 1,
 *      username: 'Anna',
 *      password: 'password123',
 *      email: 'anna@example.com',
 *      address: 'Karaportti 2, Espoo',
 *      favorite_pizza: 'Classic',
 *      phone_number: '123456789',
 *      user_level_id: 1,
 *      created_at: 2023-11-14T10:48:00.000Z
 * }
 * }
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 * {
 * "message": "an error occurred"
 * }
 * 
 */
.put(grantAdminPrivileges);

export default userRouter;
