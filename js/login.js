// Function to handle login
    async function login(name, password) {
        try {
        const response = await fetch('https://v2.api.noroff.dev/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();
        const accessToken = data.accessToken;

        // Save token to local storage
        localStorage.setItem('accessToken', accessToken);

        // Display success message
        document.getElementById('success-message').textContent = 'You have logged in. You can edit posts or register a new admin.';
        document.getElementById('error-message').textContent = '';

        // Show register button
        document.getElementById('register-button').style.display = 'block';
        } catch (error) {
          // Display error message
        document.getElementById('error-message').textContent = error.message;
        document.getElementById('success-message').textContent = '';

        // Hide register button on login failure
        document.getElementById('register-button').style.display = 'none';
        }
    }

    // Check if the user is already logged in
    window.onload = function() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
        // If access token is available, show register button and success message
        document.getElementById('register-button').style.display = 'block';
        document.getElementById('success-message').textContent = 'You are already logged in. You can edit posts or register a new admin.';
        }
    };

    // Event listener for login form submission
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        // Call login function with name and password
        login(name, password);
    });