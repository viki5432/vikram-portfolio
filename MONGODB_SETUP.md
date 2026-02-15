# 🔧 MongoDB Atlas Setup Guide

## Quick Start Guide for MongoDB Atlas

This guide will help you set up MongoDB Atlas for your portfolio website in under 10 minutes.

## Step-by-Step Setup

### 1️⃣ Create MongoDB Atlas Account (2 minutes)

1. Visit: https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with:
   - Email address
   - Or Google/GitHub account
4. Verify your email if required

---

### 2️⃣ Create Your First Cluster (5 minutes)

1. **After logging in, click**: "Build a Database"

2. **Choose Deployment Type**: 
   - Select **"Shared"** (FREE tier)
   - This gives you 512MB storage for free

3. **Select Cloud Provider & Region**:
   - Provider: AWS, Google Cloud, or Azure (any is fine)
   - Region: Choose closest to your location
   - Keep other settings as default

4. **Name Your Cluster**: 
   - Default name is fine (e.g., "Cluster0")
   - Or use custom name like "PortfolioCluster"

5. **Click**: "Create Cluster"
   - ⏱️ Wait 3-5 minutes for cluster to deploy

---

### 3️⃣ Create Database User (1 minute)

1. Click **"Database Access"** in left sidebar

2. Click **"Add New Database User"**

3. **Authentication Method**: 
   - Choose "Password"

4. **Create Credentials**:
   ```
   Username: vikramportfolio
   Password: [Generate Strong Password]
   ```
   - Click "Autogenerate Secure Password" (recommended)
   - **⚠️ COPY AND SAVE THIS PASSWORD!** You'll need it later

5. **Database User Privileges**:
   - Select "Read and write to any database"

6. Click **"Add User"**

---

### 4️⃣ Configure Network Access (1 minute)

1. Click **"Network Access"** in left sidebar

2. Click **"Add IP Address"**

3. **For Development**:
   - Click "Allow Access from Anywhere"
   - This adds `0.0.0.0/0` (all IPs)
   - ⚠️ For production, add specific IPs only

4. Click **"Confirm"**

---

### 5️⃣ Get Connection String (1 minute)

1. Go back to **"Database"** in left sidebar

2. Find your cluster and click **"Connect"**

3. Choose **"Connect your application"**

4. **Settings**:
   - Driver: Node.js
   - Version: 4.1 or later

5. **Copy the connection string**:
   ```
   mongodb+srv://vikramportfolio:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

### 6️⃣ Configure Your Application

1. **Open** your `.env` file

2. **Replace** the `MONGO_URI` with your connection string:
   ```env
   MONGO_URI=mongodb+srv://vikramportfolio:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolioDB?retryWrites=true&w=majority
   ```

3. **Important Changes**:
   - Replace `<password>` with your actual password
   - Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL
   - Add `/portfolioDB` before the `?` to specify database name

4. **Example**:
   ```env
   MONGO_URI=mongodb+srv://vikramportfolio:SecurePass123@cluster0.abc123.mongodb.net/portfolioDB?retryWrites=true&w=majority
   PORT=5000
   ```

---

## 🔐 Special Characters in Password

If your password contains special characters, you must URL-encode them:

| Character | URL Encoded |
|-----------|-------------|
| `@`       | `%40`       |
| `:`       | `%3A`       |
| `#`       | `%23`       |
| `/`       | `%2F`       |
| `?`       | `%3F`       |
| `&`       | `%26`       |
| `=`       | `%3D`       |
| `+`       | `%2B`       |
| ` ` (space) | `%20`     |

**Example**: 
- Password: `My@Pass:123`
- Encoded: `My%40Pass%3A123`

---

## ✅ Test Your Connection

1. **Start the server**:
   ```bash
   node server.js
   ```

2. **Look for success message**:
   ```
   ✅ MongoDB Atlas Connected Successfully!
   📊 Database: portfolioDB
   🚀 Server running on port 5000
   ```

3. **Test in browser**:
   - Visit: http://localhost:5000/health
   - Should see: `"database": "Connected"`

---

## 🐛 Common Issues & Solutions

### ❌ "Authentication failed"
**Problem**: Wrong username or password

**Solution**:
- Double-check username and password
- Check for extra spaces
- Verify special characters are URL-encoded
- Try creating a new database user

---

### ❌ "ENOTFOUND" or "Connection timeout"
**Problem**: Can't find cluster or network blocked

**Solution**:
- Verify cluster URL is correct (copy fresh from Atlas)
- Check your internet connection
- Make sure cluster is not paused
- Verify IP is whitelisted (0.0.0.0/0 for testing)

---

### ❌ "Database service unavailable"
**Problem**: Cluster is paused or not running

**Solution**:
- Go to MongoDB Atlas dashboard
- Check if cluster status is "PAUSED"
- Click "Resume" if paused
- Free tier clusters auto-pause after inactivity

---

### ❌ "No database selected"
**Problem**: Missing database name in connection string

**Solution**:
- Ensure `/portfolioDB` is in connection string
- Should be: `...mongodb.net/portfolioDB?retryWrites=...`
- NOT: `...mongodb.net/?retryWrites=...`

---

## 📊 View Your Data

### Using MongoDB Atlas Dashboard

1. Go to **"Database"** in Atlas dashboard
2. Click **"Browse Collections"** on your cluster
3. Select database: `portfolioDB`
4. Select collection: `contacts`
5. View all submitted contact form data

### Using the API

Visit: http://localhost:5000/contacts

Returns all contact form submissions as JSON.

---

## 🎉 You're All Set!

Your portfolio website is now connected to MongoDB Atlas!

**Next Steps**:
1. ✅ Test the contact form on your website
2. ✅ Submit a test message
3. ✅ Check MongoDB Atlas to see the data
4. ✅ Customize your portfolio content

---

## 📞 Need Help?

If you encounter any issues:

1. Check the troubleshooting section in README.md
2. Review server console logs for detailed error messages
3. Visit MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
4. MongoDB Community Forums: https://www.mongodb.com/community/forums/

---

**Happy Coding! 🚀**
