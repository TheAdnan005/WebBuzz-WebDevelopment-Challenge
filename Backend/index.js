const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB


mongoose.connect('mongodb+srv://shaikaddu2005:7bCXI8V3wyksupbl@cluster0.jeb93.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

// Create a schema for user data
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    email: String,
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Save user data
app.post('/api/register', async (req, res) => {
    console.log("received data");
    
    const userData = req.body;
    try {
        const user = new User(userData);
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
