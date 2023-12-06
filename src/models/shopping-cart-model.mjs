import promisePool from "../utils/database.mjs";

const fetchPizza = async (id) => {
    try {
        const sql = `SELECT pizza_id, dough, size, price, prompt_id, quantity FROM Pizza WHERE user_id = ?`;
        const params = [id]
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log('result', result);

        const sql3 = `SELECT ingredient_id FROM PizzaIngredient WHERE pizza_id = ?`;
        const params3 = [rows[0].pizza_id]
        const result3 = await promisePool.query(sql3, params3);
        const [rows3] = result3;
        console.log('result3', result3);

        const sql4 = `SELECT name FROM Ingredients WHERE ingredient_id IN (?)`;
        const params4 = [rows3.map(row => row.ingredient_id)];
        const [result4] = await promisePool.query(sql4, params4);
        console.log('result4', result4);

        if (rows[0].prompt_id !== null) {
            const sql2 = `SELECT prompt_name FROM Prompts WHERE prompt_id = ?`;
            const params2 = [rows[0].prompt_id]
            const result2 = await promisePool.query(sql2, params2);
            const [rows2] = result2;
            const name = rows2[0].prompt_name;
            console.log(name);
            return {rows, name};
        } else {
            return {rows, result4};
    }
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

export {fetchPizza}