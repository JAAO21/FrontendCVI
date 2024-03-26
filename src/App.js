
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import Dashboard from './pages/Private/Dashboard/Dashboard'
import Seller from './pages/Private/Seller/seller'
import InfoSeller from './pages/Private/InfoSeller/InfoSeller'
import SearchSeller from './pages/Private/SearchSeller/SearchSeller.js'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {

  return <AuthProvider>
  </AuthProvider>
}

export default App
