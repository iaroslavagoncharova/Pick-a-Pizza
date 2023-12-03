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
 * 
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

export {loginUser, registerUser};