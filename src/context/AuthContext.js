import React, { useState, useEffect, createContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from '../pages/Private/Dashboard/Dashboard'
import InfoSeller from '../pages/Private/InfoSeller/InfoSeller'
import SearchSeller from '../pages/Private/SearchSeller/SearchSeller'
import Seller from '../pages/Private/Seller/seller'
import Login from '../pages/Public/Login/Login'
import { isAuthenticated } from '../services/AuthService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(undefined)

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = isAuthenticated()
            setToken(token)
        }
        checkLoggedIn()
    }, [])

    const routerPublic = createBrowserRouter([
        {
            path: "/",
            element: <Login setToken={setToken} />
        },
        {
            path: "/dashboard",
            element: <Dashboard />
        }
    ])

    const routerPrivate = createBrowserRouter([
        {
            path: "/registrar",
            element: <Seller />
        },
        {
            path: "/informacionVendedor/:identificationNumber",
            element: <InfoSeller />
        },

        {
            path: "/",
            element: <SearchSeller />
        }
    ])

    return (
        <AuthContext.Provider value={[token, setToken]}>
            <RouterProvider router={token ? routerPrivate : routerPublic} />
        </AuthContext.Provider>
    )
}


export default AuthContext