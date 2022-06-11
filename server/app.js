const api = require('./routes/api');
const express = require('express');
const path = require('path');
const app = express();

// Settings
app.set('port', process.env.PORT || 5000);

// Static Files (Frontend location)
app.use(express.static(path.join(__dirname, 'build')));

// Middlewares
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Routers
app.use('/api', api);

// Redirection to frontend if url isnt /api
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Listening server on port', app.get('port'));
});