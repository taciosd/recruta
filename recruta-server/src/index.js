const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
//const passport = require('passport');

const envParseResult = require('dotenv').config();
if (envParseResult.error) {
    console.log('There is no .env file in the server root directory.');
    if (process.env.NODE_ENV === 'development')
        throw envParseResult.error;
}

mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + '?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
)
.catch(function(reason) {
    console.log('MongoDB connection error: ' + reason);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    const path = require('path');
    console.log('hosting front-end files');
    
    app.use(express.static(path.join(__dirname, '/../../recruta-web/build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../../recruta-web/build/index.html'));
    });
}

//app.use(passport.initialize());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});