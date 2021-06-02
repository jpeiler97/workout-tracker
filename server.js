const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

//Uncomment after adding models
// const db = require('./models');

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//Uncomment after adding models models
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/', { useNewUrlParser: true });

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
