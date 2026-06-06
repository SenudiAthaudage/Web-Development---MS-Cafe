document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    clearErrors();

    let isValid = true;

    if (!fullname) {
        showError('fullname', 'Full name is required.');
        isValid = false;
    }

    if (!email) {
        showError('email', 'Email is required.');
        isValid = false;
    }

    const phoneRegex = /^[0-9()\-\+\s]{7,15}$/;

    if (!phone) {
        showError('phone', 'Phone number is required.');
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        showError('phone', 'Please enter a valid phone number.');
        isValid = false;
    }

    if (!password) {
        showError('password', 'Password is required.');
        isValid = false;
    } else if (password.length < 8) {
        showError('password', 'Password must be at least 8 characters.');
        isValid = false;
    }

    if (!confirmPassword) {
        showError('confirm-password', 'Please confirm your password.');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirm-password', 'Passwords do not match.');
        isValid = false;
    }

    if (!isValid) return;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email]) {
        showError('email', 'An account with this email already exists.');
        return;
    }

    users[email] = {
        fullname,
        email,
        phone,
        password
    };

    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully! Please log in.');
    window.location.href = '../login/login.html';
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