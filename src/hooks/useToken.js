/* import { useState } from "react"

const useToken = () => {

  const getToken = () => {
    const tokenString = localStorage.getItem('token')
    const usertToken = tokenString && JSON.parse(tokenString)
    return usertToken?.token
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken.token)
  }

  const deleteToken = () => {
    localStorage.clear()
  }

  return {
    saveToken,
    deleteToken, setToken,
    token
  }
};

export default useToken; */