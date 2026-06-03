const accountBtn = document.getElementById('accountBtn');
const dropdown = document.getElementById('dropdown');
const loggedInDropdown = document.getElementById('loggedInDropdown');
const loggedOutDropdown = document.getElementById('loggedOutDropdown');
const userName = document.getElementById('userName');

const loggedInEmail = localStorage.getItem('loggedInUser');
const users = JSON.parse(localStorage.getItem('users')) || {};
const user = loggedInEmail ? users[loggedInEmail] : null;

if (user) {
    loggedInDropdown.style.display = 'block';
    const firstName = user.fullname.split(' ')[0];
    userName.textContent = firstName;

    // Populate sidebar
    document.querySelector('.sidebar-name').textContent = user.fullname;
    document.querySelector('.sidebar-email').textContent = user.email;
    const nameParts = user.fullname.trim().split(' ');
    const initials = (nameParts[0]?.[0] || '') + (nameParts[1]?.[0] || '');
    document.querySelector('.avatar').textContent = initials.toUpperCase();
} else {
    loggedOutDropdown.style.display = 'block';
}

accountBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
});

document.addEventListener('click', function() {
    dropdown.classList.remove('open');
});

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../login/login.html';
}

// ── Order Data ────────────────────────────────────────────

// Hardcoded orders — replace this with real data later when
// your partner's product/cart page saves orders to localStorage
const hardcodedOrders = [
    {
        id: 'ORD001',
        date: 'May 28, 2026',
        items: [
            { name: 'Taro Milk Tea', qty: 1, price: 120 },
            { name: 'Matcha Latte', qty: 2, price: 100 }
        ],
        total: 320.00,
        status: 'completed'
    },
    {
        id: 'ORD002',
        date: 'May 20, 2026',
        items: [
            { name: 'Brown Sugar Boba', qty: 1, price: 130 }
        ],
        total: 130.00,
        status: 'completed'
    },
    {
        id: 'ORD003',
        date: 'May 15, 2026',
        items: [
            { name: 'Strawberry Fruit Tea', qty: 2, price: 140 },
            { name: 'Lychee Green Tea', qty: 1, price: 100 }
        ],
        total: 380.00,
        status: 'pending'
    },
    {
        id: 'ORD004',
        date: 'May 10, 2026',
        items: [
            { name: 'Mango Yakult', qty: 1, price: 150 }
        ],
        total: 150.00,
        status: 'cancelled'
    }
];

// Save hardcoded orders to localStorage if not already there
// When your partner's order system is ready, remove this block
if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify(hardcodedOrders));
}

// ── Render Orders ─────────────────────────────────────────

function renderOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const tbody = document.querySelector('.orders-table tbody');
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding: 40px; color: #6b7280;">
                    No orders yet.
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

// ── Reorder ───────────────────────────────────────────────

function reorder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);

    if (!order) return;

    // Load existing cart or start fresh
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    order.items.forEach(function(item) {
        // Check if item already exists in cart
        const existing = cart.find(c => c.name === item.name);
        if (existing) {
            existing.qty += item.qty;
        } else {
            cart.push({ name: item.name, qty: item.qty, price: item.price });
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    // Confirm to user
    alert(`Items added to your cart! (${order.items.length} item${order.items.length > 1 ? 's' : ''})`);

    // Redirect to cart when your partner's page is ready — just uncomment this:
    // window.location.href = '../cart/cart.html';
}

// ── Init ──────────────────────────────────────────────────
renderOrders();