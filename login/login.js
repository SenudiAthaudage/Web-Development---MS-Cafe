// login.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    clearErrors();

    let isValid = true;

    if (!email) {
        showError('email', 'Email is required.');
        isValid = false;
    }

    if (!password) {
        showError('password', 'Password is required.');
        isValid = false;
    }

    if (!isValid) return;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[email]) {
        showError('email', 'No account found with this email.');
        return;
    }

    if (users[email].password !== password) {
        showError('password', 'Incorrect password. Please try again.');
        return;
    }

    // Save logged in user's email as the key to look them up
    localStorage.setItem('loggedInUser', email);

    window.location.href = '../home/home.html';
});

function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    input.classList.add('input-error');
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    input.parentNode.appendChild(error);
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
}