import express, { json } from 'express';
import path, { join }  from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import database from './database/database.cjs';
import 'dotenv/config'
const app = express();

// Routes
import api from './api.js';

// Settings
app.set('port', process.env.PORT || 5000);

// Static Files (Frontend location)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(join(__dirname, 'build')));

// Middlewares
// Parse JSON bodies (as sent by API clients)
app.use(json());
app.use(session({
    // eatontime (SHA256)
    secret: '2643db4fac36d614d06b066a1f62411c278ed09cb6804150384fc3fb0cbcc6fd',
    store: database.sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: (1000 * 60 * 60 * 12)
    }
}));

// Check if user has a session, if not returns no home (pending)

// Api redirection
app.use('/api', api);

// Redirection to frontend if url isnt /api
app.get('*', (_, res) => {
    res.sendFile(join(__dirname, 'build', 'index.html'));
});

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Listening server on port', app.get('port'));
});