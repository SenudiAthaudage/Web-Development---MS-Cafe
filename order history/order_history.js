function renderOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const tbody = document.querySelector('.orders-table tbody');
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding: 40px; color: #6b7280;">
                    No orders yet. <a href="../order/order.html">Start ordering!</a>
                </td>
            </tr>`;
        return;
    }

    orders.forEach(function(order) {
        const itemsList = order.items
            .map(item => `<li>${item.name} x${item.qty}</li>`)
            .join('');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.date}</td>
            <td><ul class="items-list">${itemsList}</ul></td>
            <td>$${order.total.toFixed(2)}</td>
            <td><span class="status ${order.status}">${capitalize(order.status)}</span></td>
            <td><button class="btn-reorder" onclick="reorder('${order.id}')">Order Again</button></td>
        `;
        tbody.appendChild(row);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//Reorder
function reorder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Save items so order.js
    const reorderItems = order.items.map(function(item) {
        return {
            name: item.name,
            qty: item.qty,
            price: item.price
        };
    });
    localStorage.setItem('reorderItems', JSON.stringify(reorderItems));

    // Ask user before redirecting
    const itemNames = order.items.map(i => `• ${i.name} x${i.qty}`).join('\n');
    const confirmed = confirm(
        `Add the following to your cart?\n\n${itemNames}\n\nClick OK to go to the order page, or Cancel to stay here.`
    );

    if (confirmed) {
        window.location.href = '../order/order.html';
    } else {
        localStorage.removeItem('reorderItems');
    }
}

renderOrders();