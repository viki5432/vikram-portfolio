document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const status = document.getElementById('status');

  // ================= FORM =================
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !message) {
        showStatus("Please fill all fields ❌", "error");
        return;
      }

      setButtonLoading(true);
      showStatus("Sending...", "loading");

      try {
        const res = await fetch("https://vikram-portfolio-mgq7.onrender.com/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();

        if (res.ok) {
          showStatus("✅ Message saved!", "success");
          form.reset();
        } else {
          showStatus("❌ " + (data.message || "Error"), "error");
        }

      } catch (err) {
        console.error(err);
        showStatus("❌ Server not reachable", "error");
      }

      setButtonLoading(false);
    });
  }

  function showStatus(msg, type) {
    if (!status) return;

    status.innerHTML = msg;
    status.className = "show";

    if (type === "success") status.style.color = "#10b981";
    else if (type === "error") status.style.color = "#ef4444";
    else status.style.color = "#3b82f6";
  }

  function setButtonLoading(isLoading) {
    if (!submitBtn) return;

    submitBtn.disabled = isLoading;
    submitBtn.style.opacity = isLoading ? "0.7" : "1";
  }

  // ================= SCROLL ANIMATION =================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("section").forEach(sec => {
    sec.classList.add("hidden");
    observer.observe(sec);
  });

  // ================= SCROLL BAR =================
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progressBar.style.width = (scroll / height) * 100 + "%";
    });
  }

  // ================= CURSOR GLOW =================
  const glow = document.querySelector(".cursor-glow");
  if (glow) {
    document.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  // ================= TYPING EFFECT =================
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const text = "Machine Learning Engineer 🚀";
    let i = 0;

    function typeEffect() {
      if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 40);
      }
    }

    typeEffect();
  }

  // ================= PARTICLES =================
  const particlesContainer = document.getElementById("particles");

  if (particlesContainer) {
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");

      p.style.left = Math.random() * 100 + "vw";
      p.style.animationDuration = (3 + Math.random() * 5) + "s";

      particlesContainer.appendChild(p);
    }
  }

});