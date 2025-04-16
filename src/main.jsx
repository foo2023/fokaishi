import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { SharedProvider } from './context/SharedContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SharedProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SharedProvider>   
  </StrictMode>,
)
