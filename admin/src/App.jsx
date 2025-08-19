import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Lists from './pages/Lists'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Add from './pages/Add'
import { adminDataContext } from './context/AdminContext'
import { ToastContainer, toast } from 'react-toastify';
  


const App = () => {
  let {adminData} = useContext(adminDataContext)
  return (
    <>
      <ToastContainer />
{!adminData ? <Login />:<>

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/list' element={<Lists />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/add' element={<Add />} />
   
    </Routes>


    </>
}
</>
  )
}

export default App