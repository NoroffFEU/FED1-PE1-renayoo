document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registrationForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Clear previous messages
        document.getElementById("errorMessages").innerText = "";
        document.getElementById("successMessages").innerText = "";

        // Get form data
        var formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value.trim()
        };

        // Basic form validation
        if (!formData.name || !formData.email || !formData.password) {
            document.getElementById("errorMessages").innerText = "All fields are required.";
            return;
        }

        // Retrieve access token from local storage
        var accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            document.getElementById("errorMessages").innerText = "Error: You need to be logged in to register a new user.";
            return;
        }

        try {
            const response = await fetch("https://v2.api.noroff.dev/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (response.status !== 201) {
                throw new Error(responseData.message || "Unable to register user.");
            }

            // Handle successful response
            document.getElementById("successMessages").innerText = "User registered successfully!";
        } catch (error) {
            // Handle error
            console.error("There was a problem registering the user:", error);
            // Display error message to the user
            document.getElementById("errorMessages").innerText = "Error: " + error.message;
        }
    });
});
