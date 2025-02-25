const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files like HTML, CSS, JS

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Tax Calculation API
app.post('/calculate-tax', (req, res) => {
    const { income, deductions, regime } = req.body;
    const taxableIncome = income - deductions;
    let tax = 0;

    if (regime === "old") {
        // Old Tax Regime (unchanged)
        if (taxableIncome <= 250000) tax = 0;
        else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
        else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.2;
        else tax = 112500 + (taxableIncome - 1000000) * 0.3;
    } else {
        // New Tax Regime for 2025-26
        if (taxableIncome <= 400000) tax = 0;
        else if (taxableIncome <= 800000) tax = (taxableIncome - 400000) * 0.05;
        else if (taxableIncome <= 1200000) tax = 20000 + (taxableIncome - 800000) * 0.1;
        else if (taxableIncome <= 1600000) tax = 60000 + (taxableIncome - 1200000) * 0.15;
        else if (taxableIncome <= 2000000) tax = 120000 + (taxableIncome - 1600000) * 0.2;
        else if (taxableIncome <= 2400000) tax = 200000 + (taxableIncome - 2000000) * 0.25;
        else tax = 300000 + (taxableIncome - 2400000) * 0.3;
    }

    res.json({ tax });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
