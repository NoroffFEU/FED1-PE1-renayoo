document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        // Make POST request to API
        fetch("https://v2.api.noroff.dev/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Handle successful response
            console.log("User registered successfully:", data);
            // Optionally, redirect to another page or show a success message
        })
        .catch(error => {
            // Handle error
            console.error("There was a problem registering the user:", error);
            // Display error message to the user
            document.getElementById("errorMessages").innerText = "Error: " + error.message;
        });
    });
});