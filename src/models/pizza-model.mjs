import promisePool from "../utils/database.mjs";

const sendInfo = async (pizzaData) => {
    try {
        const sql = `INSERT into Pizza (dough, size, calories, carbs, protein, fats, price) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [pizzaData.dough, pizzaData.size, pizzaData.calories, pizzaData.carbs, pizzaData.protein, pizzaData.fats, pizzaData.price];
        const result = await promisePool.query(sql, params);
        console.log('Inserted pizza', pizzaData);
        return result;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const getInfo = async () => {
    try {
        const sql = `SELECT * FROM Pizza`;
        const result = await promisePool.query(sql);
        const [rows] = result;
        console.log(result);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

export default sendInfo;