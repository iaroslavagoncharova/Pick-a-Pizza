'use strict';

const fetchOrders = async (userId) => {
    const orderCont = document.getElementById('order-list');

    const response = await fetch (`/order-data/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    console.log('fetchOrders reached');
    const orderHistory = await response.json();
    console.log('fetchOrders', orderHistory);

    for (let order of orderHistory.order_history) {
    const orderDiv = document.createElement('div');
    orderDiv.style.backgroundColor = '#e5ddda';
    orderDiv.style.width = '90%';
    orderDiv.style.margin = 'auto';
    const thisOrder = document.createElement('li');

    const orderId = document.createElement('span');
    orderId.innerHTML = 'Order ID: ' + order.order_id + '<br>';
    const amount = document.createElement('span');
    amount.innerHTML = 'Pizza Amount: ' + order.cart_pizza_amount + '<br>';
    const price = document.createElement('span');
    price.innerHTML = 'Price: ' + order.cart_price + ' €<br>';
    const timestamp = document.createElement('span');
    timestamp.innerHTML = 'Timestamp: ' + order.order_timestamp;

    thisOrder.appendChild(orderId);
    thisOrder.appendChild(amount);
    thisOrder.appendChild(price);
    thisOrder.appendChild(timestamp);

    orderDiv.appendChild(thisOrder);
    orderCont.appendChild(orderDiv);
    }    
};

export default fetchOrders;