import promisePool from "../utils/database.mjs";

/**
 * Fetch user from database based on email/pswd pair
 * @param {object} userCreds - {email, password}
 * @returns user object
 */
const loginUser = async (userCreds) => {
    try {
        const sql = `SELECT * FROM Users WHERE email = ? AND password = ?`;
        const params = [userCreds.email, userCreds.password];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

/**
 * Get user from database with user id
 * @param {string} userId 
 * @returns user data from database or error message
 */
const getUser = async (userId) => {
    try {
        const sql = 'SELECT * FROM Users WHERE user_id = ?';
        const result = await promisePool.query(sql, userId);
        const [rows] = result;
        console.log('getUser', rows[0]);
        console.log(typeof rows[0]);
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
}

/**
 * Get all users from database
 * @returns list of user objects
 */
const getAllUsers = async () => {
    try {
        const sql = 'SELECT * FROM Users';
        const result = await promisePool.query(sql);
        const [rows] = result;
        console.log('getAllUsers', rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
}

/**
 * Insert new user object into database 
 * @param {object} userCreds 
 * @returns success or error message in JSON form
 */
const registerUser = async (userCreds) => {
    try {
        const sql = `INSERT INTO Users (username, password, email, address, phone_number) 
        VALUES
        (?, ?, ?, ?, ?)`;
        const params = [userCreds.username, userCreds.password, userCreds.email, userCreds.address, userCreds.phone_number];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log(rows);
        return {message: 'POST request successful'};
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
}

/**
 * Update selected values of user object based on user id
 * @param {object} userCreds 
 * @returns success or error message in JSON form
 */
const updateUser = async (userCreds) => {
    try {
        const sql = `UPDATE Users SET username = ?, email = ?, address = ?, phone_number = ? WHERE user_id = ?`;
        const params = [userCreds.username, userCreds.email, userCreds.address, userCreds.phone_number, userCreds.user_id];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log(rows);
        return {message: 'PUT request successful'}
    } catch (e) {
        console.log('error', e.message);
        return {error: e.message};
    }
}

/**
 * Get user from database with user id 
 * if successful, sets a new value for user password
 * @param {object} userCreds 
 * @returns success or error message in JSON form
 */
const updatePassword = async (userCreds) => {
    try {
        let sql = `SELECT * FROM Users WHERE user_id = ?`;
        const user_id = [userCreds.user_id];
        let result = await promisePool.query(sql, user_id);
        const [rows] = result;
        if (rows[0].password === userCreds.password) {
            sql = `UPDATE Users SET password = ? WHERE user_id = ?`;
            const params = [userCreds.new_password, userCreds.user_id];
            result = await promisePool.query(sql, params);
            const [rows] = result;
            console.log(rows);
            return {message: 'PUT request successful'};
        } else {
            return {error: 'wrong input for current password'};
        }
    } catch (e) {
        console.log('error', e.message);
        return {error: e.message};
    }
}

const removeUser = async (id) => {
    console.log('removeUser');
    try {
        const sql = [`DELETE FROM Orders WHERE user_id = ${id};`, `DELETE FROM CartPizza WHERE cart_id IN (SELECT cart_id FROM ShoppingCart WHERE user_id = ${id});`, `DELETE FROM ShoppingCart WHERE user_id = ${id};`, `DELETE FROM Reviews WHERE user_id = ${id};`, `DELETE FROM Pizza WHERE user_id = ${id};`, `DELETE FROM Users WHERE user_id = ${id};`];
        const [rows] = [];
        for (let line of sql) {
            await promisePool.query(line);
        }
        console.log('rows', rows);
        return {message: 'Deleted successfully'};
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
  }
    
};

export {loginUser, registerUser, updateUser, updatePassword, getUser, getAllUsers, removeUser};