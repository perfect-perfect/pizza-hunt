// sets up Mongoose to connect when we start the app.
const mongoose = require('mongoose');

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// mongoose.connect() tells Mongoose which database we want to connect to.
//  - if the environment variable 'MONGODB_URI' exists, like on Heroku when we deploy later, it will use that. 
//  - Otherwise, it will short-circuit to the local MongoDB server's database at mongodb://localhost:27017/pizza-hunt
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-hunt', {
    // set of configuration options Mongoose asks for more information about.
    useNewUrlParser: true,
    // set of configuration options Mongoose asks for more information about.
    useUnifiedTopology: true
});

// use this to log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
