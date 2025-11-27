// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
// IMPORTANT: Render sets the PORT dynamically. Use process.env.PORT or fallback to 3000.
const PORT = process.env.PORT || 3000; 
const USERS_FILE = path.join(__dirname, 'users.json');

// --- Middleware & Setup ---
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

// Tell Express to look for static files (like your index.html) 
// within the current directory.
app.use(express.static(__dirname));

// Function to read/save users (as defined previously)
const readUsers = () => { /* ... implementation ... */ };
const saveUsers = (users) => { /* ... implementation ... */ };
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}


// --- ROUTES ---

// Route to handle signup POST requests
app.post('/signup', (req, res) => {
    // ... (Your signup logic remains here) ...
    // The simplified signup logic (CREATE/SAVE) is what connects to your 'data store' (users.json)
    // ...
});

// Route to serve the HTML file (This is now largely covered by express.static, 
// but keeping the '/' route is common practice)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
