const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', { useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false});

app.use(require('./routes/api.js'));
app.use(require('./routes/index.js'));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
