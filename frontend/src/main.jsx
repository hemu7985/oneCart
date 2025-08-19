import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthContext from './context/authContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContex.jsx' // ✅ correct filename and export
import ShopContext from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext> 
       <ShopContext>
  <App />
       </ShopContext>
      
      </UserContext>
    </AuthContext>
  </BrowserRouter>
)

