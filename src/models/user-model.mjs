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

export default loginUser;