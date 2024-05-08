// Function to register a new user
function registerUser(username, email, password) {
    // Data to send in the request body
    const userData = {
        username: username,
        email: email,
        password: password
    };

    // Sending a POST request to the registration endpoint
    fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        // Registration successful
        console.log('User registered successfully');
        // You can redirect the user to another page or perform other actions here
    })
    .catch(error => {
        console.error('Registration error:', error);
        // Handle registration error, show error message, etc.
    });
}

// Example usage:
const username = 'example_user';
const email = 'user@example.com';
const password = 'example_password';

registerUser(username, email, password);