// script.js - handles contact form submissions

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Check if fields are empty
    if (!name || !email || !message) {
      status.innerText = "Please fill in all fields ❌";
      status.style.color = "red";
      return;
    }

    // Show sending status
    status.innerText = "Sending...";
    status.style.color = "blue";

    try {
      // Replace with your deployed backend URL when ready
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        const text = await res.text();
        status.innerText = text;
        status.style.color = "green";
        form.reset(); // Clear form fields
      } else {
        status.innerText = "Failed to send message ❌";
        status.style.color = "red";
      }
    } catch (err) {
      console.error(err);
      status.innerText = "Server error ❌";
      status.style.color = "red";
    }
  });
});
