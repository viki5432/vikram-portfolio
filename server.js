const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(".")); // Serve static files (HTML, CSS, JS)

/* ================= SQLITE DATABASE ================= */
const db = new sqlite3.Database(path.join(__dirname, "database.db"), (err) => {
  if (err) console.error("❌ SQLite Connection Error:", err.message);
  else console.log("✅ SQLite Connected Successfully!");
});

// Create contacts table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
  (err) => {
    if (err) console.error("❌ Error creating contacts table:", err.message);
  }
);

/* ================= ROUTES ================= */

// Home route - serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "Server is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Contact form submission route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).send("All fields are required");
  }

  const stmt = db.prepare(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)"
  );
  stmt.run(name.trim(), email.trim().toLowerCase(), message.trim(), (err) => {
    if (err) {
      console.error("❌ Error saving contact:", err.message);
      return res.status(500).send("Server error. Please try again later.");
    }
    console.log(`✅ New contact message saved: ${name} (${email})`);
    res.status(201).send("Message saved successfully!");
  });
  stmt.finalize();
});

// Get all contacts (admin route - optional)
app.get("/contacts", (req, res) => {
  db.all("SELECT * FROM contacts ORDER BY createdAt DESC", [], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching contacts:", err.message);
      return res.status(500).json({ error: "Server error" });
    }
    res.json({
      count: rows.length,
      contacts: rows,
    });
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Route not found");
});

/* ================= SERVER START ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`\n📡 Ready to accept connections...\n`);
});

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down gracefully...");
  db.close(() => {
    console.log("✅ SQLite connection closed");
    process.exit(0);
  });
});
