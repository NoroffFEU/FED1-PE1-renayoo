// Function to handle login
async function login(email, password) {
    try {
        const response = await fetch('https://v2.api.noroff.dev/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Wrong username or password');
        }

        const data = await response.json();
        const accessToken = data.accessToken;

        // Save token to local storage
        localStorage.setItem('accessToken', accessToken);


        // Hide login container and show logged-in message
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('logged-in-message').style.display = 'block';

        // Display success message
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = 'You have now logged in. You can edit posts or register a new admin.';
        successMessage.style.color = 'black';

        // Show register button
        document.getElementById('register-button-logged-in').style.display = 'block';
    } catch (error) {
        // Display error message
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = error.message;
        errorMessage.style.color = 'red';

        // Hide logged-in message
        document.getElementById('logged-in-message').style.display = 'none';
        document.getElementById('register-button-logged-in').style.display = 'none';
    }
}

// Check if the user is already logged in
window.onload = function () {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        // If access token is available, show logged-in message
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('logged-in-message').style.display = 'block';
        document.getElementById('success-message').textContent = 'You are already logged in. You can edit posts or register a new admin.';
        document.getElementById('success-message').style.color = 'black';
        document.getElementById('register-button-logged-in').style.display = 'block';
    } else {
        // If no access token is available, hide logged-in message  
        document.getElementById('logged-in-message').style.display = 'none';
        document.getElementById('register-button-logged-in').style.display = 'none';
    }
};

// Event listener for login form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Call login function with email and password
    login(email, password);
});

// Log out the user - remove access token
function logout() {
    // Remove the authentication token from local storage
    localStorage.removeItem('accessToken');
    // Redirect the user to the login page
    window.location.href = 'login.html';
}