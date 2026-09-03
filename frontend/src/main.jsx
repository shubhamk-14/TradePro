import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { MarketProvider } from './context/MarketContext'
import { LanguageProvider } from './context/LanguageContext'

// Configure global Axios API Base URL for production / Vercel deployments
const apiBase = import.meta.env.VITE_API_BASE_URL;
if (apiBase) {
  axios.defaults.baseURL = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase;
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
