const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

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
app.use(routes);

app.listen(3333);