// script.js - Enhanced contact form handling with smooth UX

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // Smooth scroll for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add scroll effect to navbar
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.style.padding = '0.75rem 5%';
    } else {
      nav.style.padding = '1.25rem 5%';
    }
    
    lastScroll = currentScroll;
  });

  // Form submission handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate fields
    if (!name || !email || !message) {
      showStatus("Please fill in all fields ❌", "error");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus("Please enter a valid email address ❌", "error");
      return;
    }

    // Show loading state
    setButtonLoading(true);
    showStatus("Sending your message...", "loading");

    try {
      // Send to backend
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        const text = await res.text();
        showStatus("✅ " + text, "success");
        form.reset();
        
        // Add success animation
        submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";
        setTimeout(() => {
          submitBtn.style.background = "";
        }, 2000);
      } else {
        const errorText = await res.text();
        showStatus("Failed to send message: " + errorText + " ❌", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      showStatus("Unable to connect to server. Please try again later. ❌", "error");
    } finally {
      setButtonLoading(false);
    }
  });

  // Helper function to show status messages
  function showStatus(message, type) {
    status.textContent = message;
    status.className = "show";
    
    // Remove previous type classes
    status.classList.remove("success", "error", "loading");
    
    // Add appropriate styling based on type
    if (type === "success") {
      status.style.color = "#10b981";
      status.style.background = "#d1fae5";
      status.style.border = "2px solid #10b981";
    } else if (type === "error") {
      status.style.color = "#ef4444";
      status.style.background = "#fee2e2";
      status.style.border = "2px solid #ef4444";
    } else if (type === "loading") {
      status.style.color = "#3b82f6";
      status.style.background = "#dbeafe";
      status.style.border = "2px solid #3b82f6";
    }
    
    // Auto-hide success/error messages after 5 seconds
    if (type !== "loading") {
      setTimeout(() => {
        status.classList.remove("show");
        setTimeout(() => {
          status.textContent = "";
          status.className = "";
          status.style.cssText = "";
        }, 300);
      }, 5000);
    }
  }

  // Helper function to set loading state on button
  function setButtonLoading(isLoading) {
    const buttonText = submitBtn.querySelector('span');
    const buttonIcon = submitBtn.querySelector('i');
    
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      buttonText.textContent = "Sending...";
      buttonIcon.className = "fas fa-spinner fa-spin";
      submitBtn.style.cursor = "not-allowed";
      submitBtn.style.opacity = "0.7";
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      buttonText.textContent = "Send Message";
      buttonIcon.className = "fas fa-paper-plane";
      submitBtn.style.cursor = "pointer";
      submitBtn.style.opacity = "1";
    }
  }

  // Add input validation feedback
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() === '' && this.hasAttribute('required')) {
        this.style.borderColor = '#ef4444';
      } else {
        this.style.borderColor = '#10b981';
      }
    });

    input.addEventListener('focus', function() {
      this.style.borderColor = '#2563eb';
    });
  });

  // Add entrance animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});
