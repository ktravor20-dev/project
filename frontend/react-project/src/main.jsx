import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import Weeklogs from './Weeklogs.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Weeklogs />
  </StrictMode>,
)
