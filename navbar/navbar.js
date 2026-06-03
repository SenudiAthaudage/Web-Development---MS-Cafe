const accountBtn = document.getElementById('accountBtn');
const dropdown = document.getElementById('dropdown');
const loggedInDropdown = document.getElementById('loggedInDropdown');
const loggedOutDropdown = document.getElementById('loggedOutDropdown');
const userName = document.getElementById('userName');

// Get logged in user's email from localStorage
const loggedInEmail = localStorage.getItem('loggedInUser');

if (loggedInEmail) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[loggedInEmail];

    if (user) {
        loggedInDropdown.style.display = 'block';
        // Show first name only in the navbar welcome
        const firstName = user.fullname.split(' ')[0];
        userName.textContent = firstName;
    }
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