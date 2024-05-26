document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault(); 

        // Get form data
        var formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        // Retrieve access token from local storage
        var accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            document.getElementById("errorMessages").innerText = "Error: You need to be logged in to register a new user.";
            return;
        }

        // Make POST request to API
        fetch("https://v2.api.noroff.dev/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                return response.json().then(data => ({
                    status: response.status,
                    body: data
                }));
            })
            .then(responseData => {
                if (responseData.status !== 201) {
                    throw new Error(responseData.body.message || "Can't register user");
                }
                // Handle successful response
                console.log("User registered successfully:", responseData.body);
                document.getElementById("successMessages").innerText = "User registered successfully!";
            })
            .catch(error => {
                // Handle error
                console.error("There was a problem registering the user:", error);
                // Display error message to the user
                document.getElementById("errorMessages").innerText = "Error: " + error.message;
            });
    });
});
