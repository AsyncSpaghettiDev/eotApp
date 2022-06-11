import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from "react-cookie";
import './index.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </StrictMode>
);
