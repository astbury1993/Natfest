import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { CookieConsentProvider } from './context/CookieConsentContext'
import { AnalyticsProvider } from './context/AnalyticsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookieConsentProvider>
      <AnalyticsProvider>
        <App />
      </AnalyticsProvider>
    </CookieConsentProvider>
  </StrictMode>,
)
