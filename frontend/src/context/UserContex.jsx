import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'

export const userDataContext = createContext()

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  

  const {serverUrl} = useContext(authDataContext)

  const getCurrentUser = async () => {
    try {
      const result = await axios.get("https://onecart-157h.onrender.com/api/user/getcurrentuser", {
        withCredentials: true,
      })
      setUserData(result.data)
      console.log(result.data)
    } catch (error) {
      setUserData(null)
      console.error('Error fetching user:', error)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const value = {
    userData,
    setUserData,
    getCurrentUser,
  }

  return (
    <>
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
    </>
  )
}

export default UserContextProvider
