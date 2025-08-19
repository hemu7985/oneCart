import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext';
import axios from 'axios'


export const adminDataContext = createContext();



const AdminContext = (  {children}) => {
    let [adminData , setadminData] = useState(null)
    let {serverUrl} = useContext(authDataContext)

    const getAdmin = async () => {
        try {
            const result = await axios.get(serverUrl +"/api/user/getadmin", {
                withCredentials: true,
              })
              setadminData(result.data)
              console.log(result.data)
        } catch (error) {
            setadminData(null)
            console.error('Error fetching admin:', error)
        }
    }

    useEffect(() => {
        getAdmin()
      }, [])


    let value = {
        adminData,
        setadminData,
        getAdmin,


    }
  return (
    <div>
        <adminDataContext.Provider value={value}>
          {children}
        </adminDataContext.Provider>
    </div>
  )
}

export default AdminContext