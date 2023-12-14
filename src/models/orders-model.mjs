import promisePool from "../utils/database.mjs";

const userOrders = async (id) => {
    console.log('userOrders');
    try {
        const sql = `SELECT O.order_id, O.created_at AS order_timestamp, SC.price AS cart_price, 
        (SELECT DISTINCT COUNT(*) FROM CartPizza WHERE cart_id = O.cart_id) AS cart_pizza_amount
        FROM Orders O
        JOIN ShoppingCart SC ON O.cart_id = SC.cart_id
        WHERE O.user_id = ${id}
        ORDER BY O.created_at DESC;`;
        const result = await promisePool.query(sql);
        const [rows] = result;
        console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
}

const ordersInProgress = async (id) => {
    console.log('ordersInProgress');
    try {
        const authSql = `SELECT user_level_id FROM Users WHERE user_id = ${id}`;
        let result = await promisePool.query(authSql);
        let [rows] = result;
        console.log(rows[0]);
        if (rows[0].user_level_id === 1) {
            const sql = `SELECT 
            Orders.order_id,
            Orders.created_at AS order_timestamp,
            ShoppingCart.price AS cart_price,
            Orders.quantity AS cart_pizza_count,
            Users.username AS user_name
            FROM Orders
            INNER JOIN ShoppingCart ON Orders.cart_id = ShoppingCart.cart_id
            INNER JOIN Users ON Orders.user_id = Users.user_id
            LEFT JOIN CartPizza ON ShoppingCart.cart_id = CartPizza.cart_id
            WHERE Orders.order_status = 'in_progress'
            GROUP BY Orders.order_id, Orders.created_at, ShoppingCart.price, Users.username`;
            result = await promisePool.query(sql);
            [rows] = result;
            console.log(rows);
            return rows;
        } else {
            return {error: 'unauthorized'};
        }
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const putOrder = async (orderData) => {
    console.log('putOrder');
    try {
        const sql = `UPDATE Orders SET order_status = ? WHERE order_id = ?`;
        const params = [orderData.order_status, orderData.order_id];
        const result = await promisePool.query(sql, params);
        let [rows] = result;
        console.log(rows[0]);
        return {message: 'PUT request successful'};
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const deleteOrder = async (id) => {
    console.log('deleteOrder');
    try {
        const sql = `DELETE FROM Orders WHERE order_id = ${id}`;
        const result = await promisePool.query(sql);
        const [rows] = result;
        return {message: 'Deleted successfully'};
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

export {userOrders, ordersInProgress, putOrder, deleteOrder};