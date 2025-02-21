require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Middleware to Protect Routes
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user info in request object
        next(); // Proceed to the next middleware or route
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Protected Route Example
app.get('/profile', authenticateUser, (req, res) => {
    res.json({ message: "User verified", user: req.user });
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

// MySQL Connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'price_tracker'
});

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// User Registration
app.post('/register', async (requestAnimationFrame, res) => {
    const { username, email, password } = requestAnimationFrame.body;

    if (!username || email || password) {
        return res.status(400).json({ message: "All fields are required"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        res.json({ message: "User registered successfully"});
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user" });
    }
});

// User Login

app.post('/login', async (req, res) => {
    const { username, password} = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = users[0];

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Login successfully", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in" });
    }
});

// Verify User with Token

app.get('/profile', async (req, res) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({ message: "User verified", user: decoded });
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


