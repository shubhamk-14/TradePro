import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { MarketProvider } from './context/MarketContext'
import { LanguageProvider } from './context/LanguageContext'

// Configure global Axios API Base URL for Vercel & Production
// Automatically fallback to live Render backend URL if env variable is omitted
const liveBackendUrl = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://tradivora.onrender.com' : '');

if (liveBackendUrl) {
  axios.defaults.baseURL = liveBackendUrl.endsWith('/') ? liveBackendUrl.slice(0, -1) : liveBackendUrl;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <MarketProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </MarketProvider>
    </AuthProvider>
  </React.StrictMode>,
)
