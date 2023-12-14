import promisePool from "../utils/database.mjs";
const fetchPizza = async (id) => {
    try {
        const sql = `SELECT pizza_id, dough, size, price, prompt_id, quantity FROM Pizza WHERE user_id = ?`;
        const params = [id];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log('all user pizzas', result);

        const pizzaDetails = await Promise.all(rows.map(async (row) => {
            const sql3 = `SELECT ingredient_id FROM PizzaIngredient WHERE pizza_id = ?`;
            const params3 = [row.pizza_id];
            const result3 = await promisePool.query(sql3, params3);
            console.log('result3', result3);
            const [rows3] = result3;
            console.log('ingredients for this pizza', params3, 'ingredient ids', rows3);

            const ingredientIds = rows3.map(row => row.ingredient_id);
            console.log('ingredientIds', ingredientIds);
            let result4 = [];
            if (ingredientIds.length > 0) {
                const sql4 = `SELECT name FROM Ingredients WHERE ingredient_id IN (?)`;
                const params4 = [ingredientIds];
                [result4] = await promisePool.query(sql4, params4);
            };
            console.log('ingredient names', result4);

            const pizzaResult = {
                ...row,
                ingredients: result4.map((item) => item.name),
            };

            return pizzaResult;
        }));

        const orderDetails = await Promise.all(pizzaDetails.map(async (pizza) => {
            const isInCart = await checkIfPizzaInCart(pizza.pizza_id);

            if (isInCart) {
                const orderResult = {
                    pizza_id: pizza.pizza_id,
                    dough: pizza.dough,
                    size: pizza.size,
                    price: pizza.price,
                    prompt_id: pizza.prompt_id,
                    quantity: pizza.quantity,
                    ingredients: pizza.ingredients,
                };
                return orderResult;
            } else {
                return null;
            }
        }));

        return { pizzaDetails, orderDetails };
    } catch (e) {
        console.error('error', e.message);
        return { error: e.message };
    }
};
// Function to check if pizza is in the cart
const checkIfPizzaInCart = async (pizzaId) => {
    const sqlOrder = `SELECT pizza_id FROM CartPizza WHERE pizza_id = ?`;
    const paramsOrder = [pizzaId];
    const resultOrder = await promisePool.query(sqlOrder, paramsOrder);
    const [rowsOrder] = resultOrder;
    console.log('ordered pizzas', rowsOrder);

    return rowsOrder.length !== 0;
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

const postCart = async (price, user_id, pizzaIds, quantity) => {
    try {
        const sql = `INSERT INTO ShoppingCart (price, user_id) VALUES (?, ?)`;
        const params = [price, user_id];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log(rows);

        const sql2 = `SELECT cart_id FROM ShoppingCart WHERE user_id = ? ORDER BY cart_id DESC LIMIT 1`;
        const params2 = [user_id];
        const result2 = await promisePool.query(sql2, params2);
        const [rows2] = result2;
        console.log(rows2);

        pizzaIds.forEach(async (pizzaId) => {
        const sql3 = `INSERT INTO CartPizza (cart_id, pizza_id) VALUES (?, ?)`;
        const params3 = [rows2[0].cart_id, pizzaId];
        const result3 = await promisePool.query(sql3, params3);
        const [rows3] = result3;
        console.log(rows3);
        });

        const sqlOrder = `INSERT INTO Orders (cart_id, order_status, user_id, quantity) VALUES (?, ?, ?, ?)`;
        const paramsOrder = [rows2[0].cart_id, 'in_progress', user_id, quantity];
        const resultOrder = await promisePool.query(sqlOrder, paramsOrder);
        const [rowsOrder] = resultOrder;
        console.log('ordered pizza', rowsOrder);

        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};



export {fetchPizza, deletePizza, putQuantity, postCart}