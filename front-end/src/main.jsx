// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  ContextProvider  from './context/AppContext.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx'
import ThemeContextProvider from './context/ThemeContext.jsx'


createRoot(document.getElementById('root')).render(
    <ThemeContextProvider>
      <LoadingProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </LoadingProvider>
    </ThemeContextProvider>

)
