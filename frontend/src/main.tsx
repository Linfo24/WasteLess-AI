import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const el = document.getElementById('root')
if (!el) throw new Error('Root element #root not found in index.html')
createRoot(el).render(<App />)
