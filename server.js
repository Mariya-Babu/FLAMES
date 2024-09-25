const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public')); 
app.use(express.json()); // Parse JSON data

// Define the file path for userData.txt
const filePath = path.join(__dirname, 'userData.txt'); // Define the path for the data file

// Endpoint to handle log requests
app.post('/log', (req, res) => {
    // Ensure that required fields are provided
    const { name1, name2, result } = req.body;
    if (!name1 || !name2 || !result) {
        return res.status(400).send('Missing required fields');
    }

    // Prepare the log data
    const logData = `${name1}, ${name2}, ${result}\n`;

    // Append the data to userData.txt
    fs.appendFile(filePath, logData, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            return res.status(500).send('Failed to log data');
        }
        console.log('Log data appended successfully'); // Log success for debugging
        res.status(200).send('Log successful');
    });
});

// Endpoint to get userData
app.get('/userdata', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading userData.txt:', err); // Log error for debugging
            return res.status(500).send('Error reading userData.txt');
        }
        res.send(data);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
