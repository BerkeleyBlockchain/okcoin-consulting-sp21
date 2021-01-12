const express = require('express');
const app = express();

// Import Routes
const pricingRoute = require('./routes/pricing');
const dataRoute = require('./routes/data');

// Set Routes
app.use('/api/pricing', pricingRoute);
app.use('/api/data', dataRoute);

// Listen on port 3000
app.listen(3000);
