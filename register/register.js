document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Clear any previous error messages
    clearErrors();

    let isValid = true;

    // Validate full name
    if (!fullname) {
        showError('fullname', 'Full name is required.');
        isValid = false;
    }

    // Validate email
    if (!email) {
        showError('email', 'Email is required.');
        isValid = false;
    }

    // Validate phone (basic: must be digits, spaces, dashes, parens, +)
    const phoneRegex = /^[0-9()\-\+\s]{7,15}$/;
    if (!phone) {
        showError('phone', 'Phone number is required.');
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        showError('phone', 'Please enter a valid phone number.');
        isValid = false;
    }

    // Validate password length
    if (!password) {
        showError('password', 'Password is required.');
        isValid = false;
    } else if (password.length < 8) {
        showError('password', 'Password must be at least 8 characters.');
        isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
        showError('confirm-password', 'Please confirm your password.');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirm-password', 'Passwords do not match. Please try again.');
        isValid = false;
    }

    if (!isValid) return;

    // Load existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email]) {
        showError('email', 'An account with this email already exists.');
        return;
    }

    // Save new user (using email as the unique key)
    users[email] = { fullname, email, phone, password };
    localStorage.setItem('users', JSON.stringify(users));

    // Success — redirect to login
    alert('Account created successfully! Please log in.');
    window.location.href = '../login/login.html';
});

// Show an error message below a specific input
function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    input.classList.add('input-error');

    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;

    input.parentNode.appendChild(error);
    }

// Clear all error states
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
}