const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files (HTML, CSS, JS)

/* ================= MONGODB ATLAS CONNECTION ================= */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI || MONGO_URI.includes('25aimb59_db_user') || MONGO_URI.includes('5sP4R0yitUSVcphh')) {
  console.error("❌ MongoDB Atlas URI not configured!");
  console.log("\n📝 Please update your .env file with your MongoDB Atlas credentials:");
  console.log("   MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/portfolioDB?retryWrites=true&w=majority\n");
} else {
  mongoose
    .connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    })
    .then(() => {
      console.log("✅ MongoDB Atlas Connected Successfully!");
      console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    })
    .catch((err) => {
      console.error("❌ MongoDB Atlas Connection Error:");
      console.error("   Message:", err.message);
      if (err.message.includes("authentication failed")) {
        console.log("\n💡 Authentication failed. Please check:");
        console.log("   - Username and password are correct");
        console.log("   - Special characters in password are URL-encoded");
        console.log("   - Database user has proper permissions");
      } else if (err.message.includes("ENOTFOUND")) {
        console.log("\n💡 Cluster not found. Please check:");
        console.log("   - Cluster URL is correct");
        console.log("   - Network connection is stable");
      }
    });
}

/* ================= MONGOOSE SCHEMA & MODEL ================= */
const ContactSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"]
    },
    email: { 
      type: String, 
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    message: { 
      type: String, 
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters long"]
    },
  },
  { 
    timestamps: true 
  }
);

const Contact = mongoose.model("Contact", ContactSchema);

/* ================= ROUTES ================= */

// Home route - serve index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Health check route
app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.json({
    status: "Server is running 🚀",
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Contact form submission route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).send("All fields are required");
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      console.error("Database not connected");
      return res.status(503).send("Database service unavailable. Please try again later.");
    }

    // Create new contact entry
    const newContact = await Contact.create({ 
      name: name.trim(), 
      email: email.trim().toLowerCase(), 
      message: message.trim() 
    });

    console.log(`✅ New contact message saved: ${newContact._id}`);
    console.log(`   From: ${name} (${email})`);

    res.status(201).send("Message saved successfully!");
  } catch (error) {
    console.error("❌ Error saving contact:", error.message);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).send(errors.join(', '));
    }
    
    res.status(500).send("Server error. Please try again later.");
  }
});

// Get all contacts (admin route - optional)
app.get("/contacts", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: "Database service unavailable" });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      count: contacts.length,
      contacts: contacts
    });
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({ error: "Server error" });
  }
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
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});
