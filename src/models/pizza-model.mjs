import promisePool from "../utils/database.mjs";

const sendInfo = async (pizzaData) => {
    try {
        const sql = `INSERT into Pizza (user_id, dough, size, message, calories, carbs, protein, fats, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [pizzaData.user_id, pizzaData.dough, pizzaData.size, pizzaData.message, pizzaData.calories, pizzaData.carbs, pizzaData.protein, pizzaData.fats, pizzaData.price, pizzaData.quantity];
        const result = await promisePool.query(sql, params);
        console.log('Inserted pizza', pizzaData);

        const ingredientSql = `SELECT ingredient_id FROM Ingredients WHERE name IN (?)`;
        const ingredientParams = [pizzaData.ingredients];
        const ingredientResult = await promisePool.query(ingredientSql, ingredientParams);

        const pizzaId = result[0].insertId;
        const insertIngredientSql = `INSERT into PizzaIngredient (pizza_id, ingredient_id) VALUES (?, ?)`;
        for (const ingredientRow of ingredientResult[0]) {
            const insertIngredientParams = [pizzaId, ingredientRow.ingredient_id];
            await promisePool.query(insertIngredientSql, insertIngredientParams);
            const [rows] = result;
            console.log(rows);
        }
        return result;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const getCalories = async (name) => {
    try {
        const sql = `SELECT calories, carbs, protein, fats, price FROM Ingredients WHERE name = ?`;
        const params = [name];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log(result);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
}

export {sendInfo, getCalories};