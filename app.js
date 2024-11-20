const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load Excel file
const workbook = XLSX.readFile('questions_answers.xlsx');
const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

// API to process user questions
app.post('/process-speech', (req, res) => {
    const userQuestion = req.body.question.toLowerCase();
    const match = sheet.find(row => row.Question.toLowerCase() === userQuestion);
    if (match) {
        res.json({ answer: match.Answer });
    } else {
        res.json({ answer: "Sorry, I don't understand that question." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
