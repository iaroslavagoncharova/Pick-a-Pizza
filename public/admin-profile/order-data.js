'use strict';

const fetchOrders = async (userId) => {
    const orderCont = document.getElementById('wip-orders');
    const modalOrderCont = document.getElementById('edit-orders');

    const response = await fetch (`/order-data/wip/auth/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    console.log('fetchOrders reached');
    const orderHistory = await response.json();
    console.log('fetchOrders', orderHistory);  

    for (let order of orderHistory.orders) {
        // content box on the left
        const thisOrder = document.createElement('li');
        const orderDiv = document.createElement('div');
        thisOrder.style.backgroundColor = '#e5ddda';
        thisOrder.style.width = '90%';
        thisOrder.style.margin = 'auto';
    
        const timestamp = document.createElement('span');
        const date = new Date(order.order_timestamp).toLocaleDateString('fi');
        const hours = new Date(order.order_timestamp).toLocaleTimeString('fi');
        timestamp.innerHTML = '<b>' + date + ' ' + hours + '</b><br>';
        const ordererName = document.createElement('span');
        ordererName.innerHTML = 'Ordered by: ' + order.user_name + '<br>';
        const orderId = document.createElement('span');
        orderId.innerHTML = 'Order ID: ' + order.order_id + '<br>';
        const amount = document.createElement('span');
        amount.innerHTML = 'Pizza Amount: ' + order.cart_pizza_count + '<br>';
        const price = document.createElement('span');
        price.innerHTML = 'Price: ' + order.cart_price + ' €';
    
        orderDiv.appendChild(timestamp);
        orderDiv.appendChild(orderId);
        orderDiv.appendChild(ordererName);
        orderDiv.appendChild(amount);
        orderDiv.appendChild(price);
    
        thisOrder.appendChild(orderDiv);
        orderCont.appendChild(thisOrder);

        // orders modal
        var duplicateOrder = orderDiv.cloneNode(true);
        
        const doneIcon = document.createElement('img');
        doneIcon.src = '../images/icons/check-icon.png';
        doneIcon.classList.add('top-nav-icon');
        doneIcon.id ='completed-icon';
        const removeIcon = document.createElement('img');
        removeIcon.src = '../images/icons/trash-icon.png';
        removeIcon.classList.add('top-nav-icon');
        removeIcon.id = 'remove-icon';

        const iconsDiv = document.createElement('div');
        iconsDiv.style.margin = 'auto 1rem auto';
        iconsDiv.style.width = '20%';
        iconsDiv.style.display = 'flex';
        iconsDiv.style.flexDirection = 'row';
        iconsDiv.style.justifyContent = 'space-between';
        iconsDiv.appendChild(doneIcon);
        iconsDiv.appendChild(removeIcon);

        const modalOrder = document.createElement('li');
        modalOrder.style.display = 'flex';
        modalOrder.style.flexDirection = 'row';
        modalOrder.style.justifyContent = 'space-between';
        modalOrder.style.backgroundColor = '#e5ddda';
        modalOrder.style.width = '100%';
        modalOrder.style.margin = 'auto';
        modalOrder.style.padding = '0.5rem';

        modalOrder.appendChild(duplicateOrder);
        modalOrder.appendChild(iconsDiv);

        modalOrderCont.style.display = 'flex';
        modalOrderCont.style.flexDirection = 'column';

        modalOrderCont.appendChild(modalOrder);
    }  
};

export default fetchOrders;