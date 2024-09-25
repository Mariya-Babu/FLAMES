const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files (HTML, CSS, JS)
app.use(express.json()); // Parse JSON data

// Endpoint to handle log requests
app.post('/log', (req, res) => {
    const logData = ` ${req.body.name1},  ${req.body.name2},  ${req.body.result}\n`;

    // Append the data to log.txt
    fs.appendFile(path.join(__dirname, 'userData.txt'), logData, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            return res.status(500).send('Failed to log data');
        }
        res.status(200).send('Log successful');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
