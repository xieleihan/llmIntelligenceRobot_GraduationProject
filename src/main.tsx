import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 引入移动端适配
import 'amfe-flexible'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
