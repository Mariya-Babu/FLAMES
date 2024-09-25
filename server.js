const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public')); 
app.use(express.json()); // Parse JSON data

// Define the file path for userData.txt
const filePath = path.join(__dirname, 'userData.txt'); // Added this line to define filePath

// Endpoint to handle log requests
app.post('/log', (req, res) => {
    const logData = `${req.body.name1}, ${req.body.name2}, ${req.body.result}\n`; // Removed extra spaces

    // Append the data to userData.txt
    fs.appendFile(filePath, logData, (err) => { // Changed 'log.txt' to 'userData.txt'
        if (err) {
            console.error('Error writing to log file:', err);
            return res.status(500).send('Failed to log data');
        }
        res.status(200).send('Log successful');
    });
});

// Endpoint to get userData
app.get('/userdata', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading userData.txt');
        }
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
