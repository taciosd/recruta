const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
//const passport = require('passport');

mongoose.connect('mongodb+srv://taciosd:cZD9260IbVlmvJjE@cluster0-q33qb.mongodb.net/test?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
)
.catch(function(reason) {
    console.log('Error: ' + reason);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../../recruta-web/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../recruta-web/build/index.html'));
});
app.use(routes);
//app.use(passport.initialize());

const PORT = process.env.PORT || 3333
app.listen(PORT);