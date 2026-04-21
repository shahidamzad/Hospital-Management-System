import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import appContextProvider from './Context/appContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <appContextProvider>
      <App />
    </appContextProvider>
  </BrowserRouter>

)
