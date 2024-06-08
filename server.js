const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const recordRoutes = require("./src/routes/recordRoutes")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', recordRoutes);

// MongoDB connection
const CONNECTION_URL = 'mongodb+srv://pratwib:Wibietea234@financial-records.74pjfrq.mongodb.net/?retryWrites=true&w=majority&appName=financial-records';
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));