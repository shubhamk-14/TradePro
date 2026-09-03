import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { MarketProvider } from './context/MarketContext'
import { LanguageProvider } from './context/LanguageContext'

// Configure global Axios API Base URL for production / Vercel deployments
if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
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
