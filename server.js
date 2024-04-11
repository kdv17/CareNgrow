const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: 'https://kdv17.github.io/CareNgrow/' }));

mongoose.connect('mongodb://localhost:27017/myapp');

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    console.log('Register route hit');
    console.log('Request body:', req.body);
    const { username, password } = req.body;
    const user = new User({ username, password });
    try {
        await user.save();
        console.log('User saved successfully');
        res.send('User registered successfully');
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send('An error occurred while registering the user');
    }
});



app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
