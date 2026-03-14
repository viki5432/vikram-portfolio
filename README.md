# 🎓 Vikram Kumar D - Portfolio Website

A modern, professional portfolio website for an aspiring Machine Learning Engineer, built with Node.js, Express, and MongoDB Atlas.

## ✨ Features

- 🎨 **Modern & Professional Design** - Beautiful gradient hero, smooth animations, responsive layout
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- 🗄️ **MongoDB Atlas Integration** - Cloud database for storing contact form submissions
- 📧 **Contact Form** - Fully functional contact form with validation and real-time feedback
- 🎯 **Smooth Animations** - Entrance animations, hover effects, and smooth scrolling
- ⚡ **Fast & Lightweight** - Optimized performance with minimal dependencies

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Styling**: Custom CSS with CSS Variables, Google Fonts (Poppins), Font Awesome Icons
- **Version Control**: Git

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier available)

## 🚀 Getting Started

### 1. Clone or Download the Project

```bash
cd /home/user/webapp
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `cors` - Enable CORS
- `dotenv` - Environment variable management

### 3. Set Up MongoDB Atlas

#### Step 1: Create a MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account (if you don't have one)
3. Create a new project (e.g., "Portfolio")

#### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider and region
4. Click "Create Cluster" (this takes 3-5 minutes)

#### Step 3: Create a Database User
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and **strong password** (save these!)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

#### Step 4: Whitelist Your IP Address
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add only your specific IP addresses
4. Click "Confirm"

#### Step 5: Get Your Connection String
1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string (it looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 4. Configure Environment Variables

Open the `.env` file in your project and update it with your MongoDB Atlas credentials:

```env
# Replace with your actual MongoDB Atlas connection string
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/portfolioDB?retryWrites=true&w=majority

# Server Port
PORT=5000
```

**Important Notes:**
- Replace `<username>` with your MongoDB Atlas username
- Replace `<password>` with your MongoDB Atlas password
- Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL
- Add `/portfolioDB` before the `?` to specify the database name
- If your password contains special characters, URL-encode them:
  - `@` → `%40`
  - `:` → `%3A`
  - `#` → `%23`
  - `/` → `%2F`
  - `?` → `%3F`

**Example:**
```env
MONGO_URI=mongodb+srv://vikram:MyP%40ssw0rd@cluster0.abc123.mongodb.net/portfolioDB?retryWrites=true&w=majority
PORT=5000
```

### 5. Run the Application

```bash
node server.js
```

You should see:
```
✅ MongoDB Atlas Connected Successfully!
📊 Database: portfolioDB
🚀 Server running on port 5000
   Local: http://localhost:5000
   Health: http://localhost:5000/health
```

### 6. Open in Browser

Visit `http://localhost:5000` in your web browser.

## 📁 Project Structure

```
webapp/
├── index.html          # Main HTML file
├── style.css           # Professional CSS styling
├── script.js           # Frontend JavaScript
├── server.js           # Express server & MongoDB connection
├── package.json        # Node.js dependencies
├── .env                # Environment variables (MongoDB URI)
├── resume.pdf          # Resume file for download
└── README.md           # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (#2563eb)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Green (#10b981)
- **Dark**: Navy (#0f172a)
- **Background**: Light gray (#f8fafc)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Key UI Elements
- Gradient hero header with floating animations
- Modern navigation bar with smooth scroll
- Skill cards with hover effects
- Professional contact form with validation
- Responsive grid layout
- Smooth entrance animations

## 📡 API Endpoints

### GET `/`
Returns the main HTML page.

### GET `/health`
Health check endpoint.
```json
{
  "status": "Server is running 🚀",
  "database": "Connected",
  "timestamp": "2026-02-15T12:00:00.000Z"
}
```

### POST `/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to connect!"
}
```

**Response:**
- `201`: "Message saved successfully!"
- `400`: Validation error
- `500`: Server error

### GET `/contacts`
Get all contact submissions (admin route).

**Response:**
```json
{
  "count": 5,
  "contacts": [...]
}
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` file to Git
2. **CORS**: Currently allows all origins (adjust for production)
3. **IP Whitelist**: Use specific IPs in production (not 0.0.0.0/0)
4. **Input Validation**: Server validates all form inputs
5. **Password Encoding**: Special characters in passwords must be URL-encoded

## 🐛 Troubleshooting

### Database Connection Issues

**Error: Authentication failed**
- Check username and password are correct
- Ensure special characters in password are URL-encoded
- Verify database user has proper permissions

**Error: ENOTFOUND**
- Check cluster URL is correct
- Verify network connection is stable
- Ensure IP address is whitelisted in MongoDB Atlas

**Error: Database service unavailable**
- MongoDB cluster might be paused (free tier auto-pauses after inactivity)
- Go to MongoDB Atlas dashboard and resume the cluster

### Form Submission Issues

**"Server error" message**
- Check browser console for detailed error
- Verify server is running (`node server.js`)
- Check MongoDB connection status

## 🚀 Deployment

### Deploy to Production

1. **Update CORS settings** in `server.js` for your domain
2. **Update MongoDB IP Whitelist** with your server's IP
3. **Set environment variables** on your hosting platform
4. **Update API endpoint** in `script.js` from `localhost` to your domain

### Recommended Hosting Platforms
- **Backend**: Render, Heroku, Railway, DigitalOcean
- **Frontend**: Netlify, Vercel, GitHub Pages (for static hosting)

## 📝 Customization

### Update Personal Information
Edit `index.html`:
- Name, title, education
- Skills list
- Contact information
- Social media links

### Change Color Scheme
Edit `style.css` CSS variables:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #8b5cf6;
  --accent-color: #10b981;
}
```

### Add New Sections
1. Add HTML in `index.html`
2. Style in `style.css`
3. Add navigation link in navbar

## 📄 License

This project is open source and available for personal and educational use.

## 👤 Author

**Vikram Kumar D**
- Email: 25aimb59@kristujayanti.com
- GitHub: [@viki5432](https://github.com/viki5432)
- Phone: +91 6361356590

## 🙏 Acknowledgments

- Google Fonts (Poppins)
- Font Awesome Icons
- MongoDB Atlas
- Express.js Community

---

**Built with ❤️ for showcasing Machine Learning aspirations**
