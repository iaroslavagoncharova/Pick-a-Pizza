import promisePool from "../utils/database.mjs";

const fetchPizza = async (id) => {
    try {
        const sql = `SELECT dough, size, price, prompt_id, quantity FROM Pizza WHERE user_id = ?`;
        const params = [id]
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log(result);
        if (rows[0].prompt_id !== null) {
            const sql2 = `SELECT prompt_name FROM Prompts WHERE prompt_id = ?`;
            const params2 = [rows[0].prompt_id]
            const result2 = await promisePool.query(sql2, params2);
            const [rows2] = result2;
            const name = rows2[0].prompt_name;
            return {rows, name};
        }
        
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

export {fetchPizza}