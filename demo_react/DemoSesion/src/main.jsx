import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
//import AppLocalStorage from './sessionLocalStorage/AppLocalStorage'
import AppCookie from './cookiesSesion/AppCookie'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppCookie />
  </StrictMode>,
)
