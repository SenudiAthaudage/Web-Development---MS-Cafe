// Navbar (same as navbar.js — paste this on every page)
const accountBtn = document.getElementById('accountBtn');
const dropdown = document.getElementById('dropdown');
const loggedInDropdown = document.getElementById('loggedInDropdown');
const loggedOutDropdown = document.getElementById('loggedOutDropdown');
const userName = document.getElementById('userName');

const loggedInEmail = localStorage.getItem('loggedInUser');
const users = JSON.parse(localStorage.getItem('users')) || {};
const user = loggedInEmail ? users[loggedInEmail] : null;

// Navbar dropdown
if (user) {
    loggedInDropdown.style.display = 'block';
    const firstName = user.fullname.split(' ')[0];
    userName.textContent = firstName;
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

// ── Profile Page ──────────────────────────────────────────

if (user) {
    // Split fullname into first and last
    const nameParts = user.fullname.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Populate profile form fields
    document.getElementById('firstname').value = firstName;
    document.getElementById('lastname').value = lastName;
    document.getElementById('email').value = user.email || '';
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('birthday').value = user.birthday || '';

    // Populate sidebar
    document.querySelector('.sidebar-name').textContent = user.fullname;
    document.querySelector('.sidebar-email').textContent = user.email;

    // Avatar initials
    const initials = (firstName[0] || '') + (lastName[0] || '');
    document.querySelector('.avatar').textContent = initials.toUpperCase();

} else {
    // Not logged in — redirect to login
    window.location.href = '../login/login.html';
}

// ── Edit / Save / Cancel ─────────────────────────────────

const inputs = document.querySelectorAll('.profile-form input');
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

let originalValues = {};

function enableEdit() {
    inputs.forEach(function(input) {
        if (input.id !== 'email') { // keep email locked
            originalValues[input.id] = input.value;
            input.removeAttribute('readonly');
        }
    });
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function saveEdit() {
    // Read updated values
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const birthday = document.getElementById('birthday').value;

    // Update user object in localStorage
    users[loggedInEmail].fullname = `${firstName} ${lastName}`.trim();
    users[loggedInEmail].phone = phone;
    users[loggedInEmail].birthday = birthday;
    localStorage.setItem('users', JSON.stringify(users));

    // Update sidebar and avatar live
    document.querySelector('.sidebar-name').textContent = users[loggedInEmail].fullname;
    const initials = (firstName[0] || '') + (lastName[0] || '');
    document.querySelector('.avatar').textContent = initials.toUpperCase();
    userName.textContent = firstName;

    inputs.forEach(function(input) {
        input.setAttribute('readonly', true);
    });

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function cancelEdit() {
    inputs.forEach(function(input) {
        input.value = originalValues[input.id] ?? input.value;
        input.setAttribute('readonly', true);
    });
    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}