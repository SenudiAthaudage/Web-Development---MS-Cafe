const loggedInEmail = localStorage.getItem('loggedInUser');
const users = JSON.parse(localStorage.getItem('users')) || {};
const user = loggedInEmail ? users[loggedInEmail] : null;

const accountBtn = document.getElementById('accountBtn');
const dropdown = document.getElementById('dropdown');
const loggedInDropdown = document.getElementById('loggedInDropdown');
const loggedOutDropdown = document.getElementById('loggedOutDropdown');
const userNameEl = document.getElementById('userName');

if (user) {
    loggedInDropdown.style.display = 'block';
    userNameEl.textContent = user.fullname.split(' ')[0];
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

if (user) {
    const nameParts = user.fullname.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    document.getElementById('firstname').value = firstName;
    document.getElementById('lastname').value = lastName;
    document.getElementById('email').value = user.email || '';
    document.getElementById('phone').value = user.phone || '';

    document.querySelector('.sidebar-name').textContent = user.fullname;
    document.querySelector('.sidebar-email').textContent = user.email;

    const initials = (firstName[0] || '') + (lastName[0] || '');
    document.querySelector('.avatar').textContent = initials.toUpperCase();

} else {
    window.location.href = '../login/login.html';
}

const inputs = document.querySelectorAll('.profile-form input');
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

let originalValues = {};

function enableEdit() {
    inputs.forEach(function(input) {
        if (input.id !== 'email') {
            originalValues[input.id] = input.value;
            input.removeAttribute('readonly');
        }
    });
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function saveEdit() {
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Update localStorage
    const allUsers = JSON.parse(localStorage.getItem('users')) || {};
    allUsers[loggedInEmail].fullname = `${firstName} ${lastName}`.trim();
    allUsers[loggedInEmail].phone = phone;
    localStorage.setItem('users', JSON.stringify(allUsers));

    // Update sidebar live
    document.querySelector('.sidebar-name').textContent = allUsers[loggedInEmail].fullname;
    const initials = (firstName[0] || '') + (lastName[0] || '');
    document.querySelector('.avatar').textContent = initials.toUpperCase();

    // Update navbar welcome name
    const userNameEl = document.getElementById('userName');
    if (userNameEl) userNameEl.textContent = firstName;

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