import { ordersInProgress, userOrders } from "../models/orders-model.mjs";

const getOrderHistoryOfUser = async (req, res) => {
    console.log('getOrderHistoryOfUser');
    try {
        const orderHistory = await userOrders(req.params.id);
        console.log('getorderhistoryofuser, orderhistory:', orderHistory);

        if(!orderHistory) {
            return res.status(404).json({message: 'no orders found!'});
        }
        
        console.log('returning...');
        return res.json({order_history: orderHistory})
    } catch (e) {
        res.status(404).json({message: 'an error occurred'});
    }
}

const getOrdersInProgress = async (req, res) => {
    console.log('getOrdersInProgress');
    try {
        const wipOrders = await ordersInProgress(req.params.id);
        if(!wipOrders) {
            return res.status(404).json({message: 'no orders found!'});
        }
        
        console.log('returning...');
        return res.json({orders: wipOrders})
    } catch (e) {
        res.status(404).json({message: 'an error occurred'});
    }
}

export {getOrderHistoryOfUser, getOrdersInProgress};

