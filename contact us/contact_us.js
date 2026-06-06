document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    clearErrors();

    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let isValid = true;

    if (!fname.value.trim()) {
        showError(fname, 'First name is required.');
        isValid = false;
    }

    if (!lname.value.trim()) {
        showError(lname, 'Last name is required.');
        isValid = false;
    }

    if (!email.value.trim()) {
        showError(email, 'Email is required.');
        isValid = false;
    }

    if (!message.value.trim()) {
        showError(message, 'Message is required.');
        isValid = false;
    }

    if (!isValid) return;

    // Show success message
    document.querySelector('form').innerHTML = `
        <div class="success-message">
            <div class="success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. We'll get back to you soon.</p>
        </div>
    `;
});

function showError(input, message) {
    input.classList.add('input-error');
    const err = document.createElement('span');
    err.className = 'error-message';
    err.textContent = message;
    input.parentNode.appendChild(err);
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
}