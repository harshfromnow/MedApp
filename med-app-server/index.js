const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB Atlas connection string
const uri = 'mongodb+srv://harshini:bzf1dRonqfvdVdwx@createacc.bevjamx.mongodb.net/Users?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB Atlas');
});

// Define user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String }, // Not required
  address: { type: String, required: true },
  address2: { type: String }, // Not required
  country: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true }
});


const User = mongoose.model('User', userSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Define a route handler for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create-account.html'));
});

// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, address, address2, country, state, zip } = req.body;

    // Validate input data
    if (!firstName || !lastName || !phoneNumber || !address || !country || !state || !zip) {
      return res.status(400).send('Missing required fields');
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      country: req.body.country,
      state: req.body.state,
      zip: req.body.zip
    });
    

    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
