        const API_URL = 'https://crudcrud.com/api/6b06424d642342c0a9863f77d2378c6a/orders';
        

        async function fetchAndPopulateOrders() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const orders = await response.json();
                orders.forEach(order => {
                    appendOrderToTable(order);
                });
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }


        function appendOrderToTable(order) {
            const orderElement = document.createElement('div');
            orderElement.classList.add('order');
            orderElement.textContent = `Dish: ${order.dish}, Price: ${order.price.toFixed(2)}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'X';
            deleteBtn.addEventListener('click', async () => {
                try {
                    const response = await fetch(`${API_URL}/${order._id}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete order');
                    }
                    orderElement.remove();
                } catch (error) {
                    console.error('Error deleting order:', error);
                }
            });

            orderElement.appendChild(deleteBtn);

            const tableDiv = document.getElementById(`table-${order.tableNumber}`);
            tableDiv.appendChild(orderElement);
        }


        window.addEventListener('load', fetchAndPopulateOrders);

        document.getElementById('order-form').addEventListener('submit', async function(event) {
            event.preventDefault();
            const dish = document.getElementById('dish-input').value;
            const price = parseFloat(document.getElementById('price-input').value);
            const tableNumber = document.getElementById('table-select').value;


            if (!dish || !price || !tableNumber) {
                alert('Please fill in all fields');
                return;
            }

            try {

                const orderData = {
                    dish,
                    price,
                    tableNumber
                };

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });

                if (!response.ok) {
                    throw new Error('Failed to create order');
                }


                const createdOrder = await response.json();


                appendOrderToTable(createdOrder);

                this.reset();
            } catch (error) {
                console.error('Error creating order:', error);
            }
        });