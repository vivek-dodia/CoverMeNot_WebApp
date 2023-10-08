document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggle-button");
    const startButton = document.getElementById("start-button");
    const body = document.body;
    const viewKeywordsButton = document.getElementById("view-keywords-button");
    const modalContainer = document.getElementById("modal-container");
    const closeButton = document.getElementById("close-button");
    const keywordsList = document.getElementById("keywords-list");

    // Add the dark-mode class to the body by default
    body.classList.add("dark-mode");
    toggleButton.innerHTML = "<span>💡</span>";

    // Existing toggle dark/light mode logic
    toggleButton.addEventListener("click", function() {
        if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            toggleButton.innerHTML = "<span>☽</span>";
        } else {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            toggleButton.innerHTML = "<span>💡</span>";
        }
    });

    // New logic to show user input fields
    startButton.addEventListener("click", function() {
        // Check if form already exists, to prevent multiple forms
        if (!document.getElementById("user-input-form")) {
            // Create a form dynamically
            const form = document.createElement("div");
            form.id = "user-input-form";
            form.innerHTML = `
                <input type="text" id="name" placeholder="Your Name">
                <input type="text" id="job-title" placeholder="Job Title">
                <input type="text" id="company-name" placeholder="Company Name">
                <input type="text" id="job-url" placeholder="Job URL">
                <button type="submit" id="generate-button">Generate, Captain!</button>
            `;

            // Style it a bit
            form.style.marginTop = "20px";
            form.style.display = "flex";
            form.style.flexDirection = "column";
            form.style.gap = "10px";

            // Append form to the container
            const container = document.querySelector(".container");
            container.appendChild(form);

            // Add a click event listener to the "Generate, Captain!" button
            const generateButton = document.getElementById("generate-button");
            generateButton.addEventListener("click", function() {
                // Get user input from the input fields
                const nameInput = document.querySelector("#name").value;
                const jobTitleInput = document.querySelector("#job-title").value;
                const companyNameInput = document.querySelector("#company-name").value;
                const jobUrlInput = document.querySelector("#job-url").value;

                // Generate a cover letter using the user input (customize this part)
                const coverLetter = `Dear ${companyNameInput},\n\nI am writing to apply for the position of ${jobTitleInput} at your company. My name is ${nameInput}, and I am excited about the opportunity to join your team.\n\n[More cover letter content here...]`;

                // Display or use the generated cover letter (customize this part)
                console.log("Generated Cover Letter:", coverLetter);
            });
        }
    });

    // New logic to show keywords dictionary when the button is clicked
    viewKeywordsButton.addEventListener("click", function() {
        // This is new: Make an HTTP GET request to the Flask server's API endpoint for keywords
        fetch("http://localhost:8080/keywords", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            // This is new: Handle the data received from the server (e.g., display it to the user)
            console.log("Keywords Dictionary:", data);
            displayKeywords(data.keywords);
            openModal();
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });

    // Function to open the modal
    function openModal() {
        modalContainer.style.display = "block";
    }

    // Close the modal when the close button is clicked
    closeButton.addEventListener("click", function() {
        modalContainer.style.display = "none";
    });

    // Function to display keywords in the modal
    function displayKeywords(keywords) {
        // Clear previous content
        keywordsList.innerHTML = "";

        // Populate the modal with keywords
        keywords.forEach(keyword => {
            const li = document.createElement("li");
            li.textContent = keyword;
            keywordsList.appendChild(li);
        });
    }
});
