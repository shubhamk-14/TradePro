import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { MarketProvider } from './context/MarketContext'
import { LanguageProvider } from './context/LanguageContext'

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
