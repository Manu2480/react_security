// Importaciones base
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';
import './satoshi.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LibreriaProvider } from './context/LibreriaContext';

// 👇 Importa el AuthProvider
import { AuthProvider } from './context/AuthContext';

const muiTheme = createTheme({ 
  palette: { mode: 'light' },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider> {/* 🔐 Contexto global primero */}
      <Router> {/* 🌍 Luego el router */}
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <LibreriaProvider>
            <App />
          </LibreriaProvider>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
