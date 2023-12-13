import promisePool from "../utils/database.mjs";

const fetchPizza = async (id) => {
    let orderedPizzas = [];
    try {
        const sql = `SELECT pizza_id, dough, size, price, prompt_id, quantity FROM Pizza WHERE user_id = ?`;
        const params = [id];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log('all user pizzas', result);

        const sqlOrder = `SELECT pizza_id FROM CartPizza WHERE pizza_id IN (?)`;
        const paramsOrder = [rows.map(row => row.pizza_id)];
        const resultOrder = await promisePool.query(sqlOrder, paramsOrder);
        const [rowsOrder] = resultOrder;
        console.log('ordered pizzas', rowsOrder);
        if (rowsOrder.length !== 0) {
            orderedPizzas = rowsOrder.map(row => row.pizza_id);
        }

        const pizzaDetails = await Promise.all(rows.map(async (row) => {
        const sql3 = `SELECT ingredient_id FROM PizzaIngredient WHERE pizza_id = ?`;
        const params3 = [row.pizza_id];
        const result3 = await promisePool.query(sql3, params3);
        const [rows3] = result3;
        console.log('ingredients for this pizza', params3, 'ingredient ids', rows3);
        if (rows3.length === 0) {
            return row;
        }

        const sql4 = `SELECT name FROM Ingredients WHERE ingredient_id IN (?)`;
        const params4 = [rows3.map(row => row.ingredient_id)];
        const [result4] = await promisePool.query(sql4, params4);
        console.log('ingredient names', result4);

        console.log(row.prompt_id);

            if (row.prompt_id !== null) {
                const sql2 = `SELECT prompt_name FROM Prompts WHERE prompt_id = ?`;
                const params2 = [row.prompt_id];
                const result2 = await promisePool.query(sql2, params2);
                const [rows2] = result2;
                const name = rows2[0].prompt_name;
                console.log('prompt name', name);
                return { ...row, name, result4 };
            } else {
                return { ...row, result4 };
            }
        }));
        return { pizzaDetails, orderedPizzas };
    } catch (e) {
        console.error('error', e.message);
        return { error: e.message };
    }
};


const deletePizza = async (id) => {
    try {
        const sqlI = `DELETE FROM PizzaIngredient WHERE pizza_id = ?`;
        const params = [id];
        const resultI = await promisePool.query(sqlI, params);
        const [rowsI] = resultI;
        const sqlP = `DELETE FROM Pizza WHERE pizza_id = ?`;
        const resultP = await promisePool.query(sqlP, params);
        const [rowsP] = resultP;
        console.log(rowsI, rowsP);
        return true;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const putQuantity = async (quantity, id) => {
    try {
        const sql = `UPDATE Pizza SET quantity = ? WHERE pizza_id = ?`;
        const params = [quantity, id];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const postCart = async (price, user_id, pizzaIds) => {
    try {
        const sql = `INSERT INTO Cart (price, user_id) VALUES (?, ?)`;
        const params = [price, user_id];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log(rows);

        const sql2 = `SELECT cart_id FROM Cart WHERE user_id = ?`;
        const params2 = [user_id];
        const result2 = await promisePool.query(sql2, params2);
        const [rows2] = result2;
        console.log(rows2);

        const sql3 = `INSERT INTO CartPizza (cart_id, pizza_id) VALUES (?, ?)`;
        const params3 = [rows2[0].cart_id, pizzaIds];
        const result3 = await promisePool.query(sql3, params3);
        const [rows3] = result3;
        console.log(rows3);

        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const getOrderedPizza = async (pizzaIds) => {
    try {
        const sql = `SELECT * FROM CartPizza WHERE pizza_id IN (?)`;
        const params = [pizzaIds];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log(rows);
        if (result) {
            return rows;
        }
    } catch (error) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

export {fetchPizza, deletePizza, putQuantity, postCart, getOrderedPizza}