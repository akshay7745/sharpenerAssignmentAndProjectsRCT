import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Applayout from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Applayout />
  </StrictMode>,
)
