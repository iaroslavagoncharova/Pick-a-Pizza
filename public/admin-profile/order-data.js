'use strict';

const fetchOrders = async (userId) => {
    const orderCont = document.getElementById('wip-orders');
    const modalOrderCont = document.getElementById('edit-orders');
    const dialog = document.getElementById('edit-orders-dialog')
    const ordersHTML = [];

    const response = await fetch (`/order-data/wip/auth/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const orderHistory = await response.json();

    for (let order of orderHistory.orders) {
        // content box on the left
        const thisOrder = document.createElement('li');
        thisOrder.classList.add('order');
        thisOrder.dataset.orderId = order.order_id;
        const orderDiv = document.createElement('div');
    
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
        ordersHTML.push(thisOrder);
        console.log(ordersHTML);

        // orders modal
        var duplicateOrder = orderDiv.cloneNode(true);
        
        const doneIcon = document.createElement('img');
        doneIcon.src = '../images/icons/check-icon.png';
        doneIcon.classList.add('top-nav-icon');
        doneIcon.classList.add('completed-icon');
        doneIcon.dataset.orderId = order.order_id;

        const removeIcon = document.createElement('img');
        removeIcon.src = '../images/icons/trash-icon.png';
        removeIcon.classList.add('top-nav-icon');
        removeIcon.classList.add('remove-icon');
        removeIcon.dataset.orderId = order.order_id;

        const iconsDiv = document.createElement('div');
        iconsDiv.classList.add('order-icons-div');
        iconsDiv.appendChild(doneIcon);
        iconsDiv.appendChild(removeIcon);

        const modalOrder = document.createElement('li');
        modalOrder.classList.add('modal-order');
        modalOrder.dataset.orderId = order.order_id;

        modalOrder.appendChild(duplicateOrder);
        modalOrder.appendChild(iconsDiv);

        modalOrderCont.appendChild(modalOrder);
    };
    
    const firstOrder = ordersHTML[0].cloneNode(true);
    console.log('ordersHTML: ', ordersHTML);
    orderCont.appendChild(firstOrder);

    const doneIcons = document.querySelectorAll('.completed-icon');
    const removeIcons = document.querySelectorAll('.remove-icon');

    for (let icon of doneIcons) {
        icon.addEventListener('click', async () => {
            const orderId = icon.dataset.orderId;
            const response = await fetch(`/order-data/wip/auth/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order_id: orderId, order_status: 'completed'}),
            });

            if (response.ok) {
                alert('Order marked as completed!');
                const orders = document.querySelectorAll('.order');
                const modalOrders = document.querySelectorAll('.modal-order');
                for (let order of orders) {
                    if (order.dataset.orderId === orderId) {
                        order.remove();
                    }
                }
                for (let order of modalOrders) {
                    if (order.dataset.orderId === orderId) {
                        order.remove();
                    }
                }
                window.location.reload();
            } else {
                alert('Something went wrong!');
            }
        });
    }

    for (let icon of removeIcons) {
        icon.addEventListener('click', async () => {
            const orderId = icon.dataset.orderId;
            const response = await fetch(`/order-data/wip/auth/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Order deleted!');
                const orders = document.querySelectorAll('.order');
                const modalOrders = document.querySelectorAll('.modal-order');
                for (let order of orders) {
                    if (order.dataset.orderId === orderId) {
                        order.remove();
                    }
                }
                for (let order of modalOrders) {
                    if (order.dataset.orderId === orderId) {
                        order.remove();
                    }
                }
                window.location.reload();
            } else {
                alert('Something went wrong!');
            }
        });
    }


};

export default fetchOrders;