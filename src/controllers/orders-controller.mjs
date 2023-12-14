import { ordersInProgress, putOrder, userOrders, deleteOrder } from "../models/orders-model.mjs";

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
};

const setOrderAsCompleted = async (req, res) => {
    console.log('setOrderAsCompleted', req.body);
    try {
        const modifiedOrder = await putOrder(req.body);

        if (!modifiedOrder) {
            return res.status(404).json({message: 'no orders found!'});
        }

        console.log('returning...');
        return res.status(200).json({message: 'PUT request successful'});
    } catch (e) {
        return res.status(400).json({message: 'bad request'});
    }
};

const removeOrder = async (req, res) => {
    console.log('removeOrder');
    try {
        const deleted = await deleteOrder(req.params.id);

        if (!deleted.error) {
            return res.status(204).json({message: "order deleted successfully"});
        } else {
            return res.status(404).json({message: 'an error occurred'});
        }
    } catch (e) {
        res.sendStatus(404).json({message: 'an error occurred'});
    }
}

export {getOrderHistoryOfUser, getOrdersInProgress, setOrderAsCompleted, removeOrder};

