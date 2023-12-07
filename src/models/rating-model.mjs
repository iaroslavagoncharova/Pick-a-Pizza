import promisePool from "../utils/database.mjs";

const getRating = async () => {
    try {
        const sql = `SELECT * FROM Reviews`;
        const result = await promisePool.query(sql);
        const [rows] = result;
        console.log(result);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const getUsernames = async(id) => {
    try {
        const sql = `SELECT username FROM Users WHERE user_id = ?`;
        const params = [id];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log(result);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const postRating = async (stars, review_header, review_text, user_id) => {
    try {
        const sql = `INSERT INTO Reviews (stars, review_header, review_text, user_id) VALUES (?, ?, ?, ?)`;
        const params = [stars, review_header, review_text, user_id];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log(result);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

export {getRating, getUsernames, postRating}