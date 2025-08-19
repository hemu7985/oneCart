import React, { useContext, useState } from 'react'
import Logo from '../assets/vcart logo.png'
import { PiEyeSlash } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import axios from 'axios'
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const Login = () => {
    const [show, setShow] = useState(false)
     let [email , setEmail] = useState("")
        let [password , setPassword] = useState("")
        let {serverUrl} = useContext(authDataContext)
        let {adminData , getAdmin} = useContext(adminDataContext)

        let navigate = useNavigate()

const AdminLogin = async (e) =>{
    e.preventDefault()
    try {
        const result = await axios.post(serverUrl + '/api/auth/adminlogin', {email,password},{withCredentials:true})
        console.log(result.data )
      toast.success("Admin login successfully")
        getAdmin()
        navigate("/")
    } catch (error) {
        console.log(error)
         toast.error("Admin login failed")
        
    }
}


  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start' >
                 <div className='w-[100%] h-[80px] flex items-center justify-start mt-[5px] px-[30px] gap-[10px] cursor-pointer'>
                     <img className='w-[40px]' src={Logo} alt='logo' />
                     <h1 className='text-[22px] font-sans'>OneCart</h1>
                 </div>
                 <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] ' >
     
                     <span className='text-[25px] font-semibold'>Login Page</span>
                     <span className='text-[16px]'> Welcome to OneCart, Apply to Admin Login</span>
                 </div>
                 <div className='max-w-[600px] w-[90%] mt-[10px]  bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center h-[400px]' >
                     <form onSubmit={AdminLogin} action="" className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
                        
                       
                         <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                             <input type="email" className='w-[100%] h-[50px] border-[2px] border=[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required  onChange={(e)=>setEmail(e.target.value)} value={email}/>
                             <input type={show ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border=[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password} />
     {                     !show &&   <PiEyeSlash className='w-[20px] cursor-pointer h-[20px] absolute right-[5%] bottom-[50%]' onClick={() => setShow(prev =>!prev)}/>}
     {                  show &&  <FaEye className='w-[20px] cursor-pointer h-[20px] absolute right-[5%] bottom-[50%]' onClick={() => setShow(prev =>!prev)} />}
                           <button className='w-[100%] h-[50px] mt-[20px] text-[17px] bg-[#6060f5] border-[2px] rounded-lg shadow-lg   px-[20px] font-semibold cursor-pointer hover:bg-blue-900'>Login</button>
     
                          
                         </div>
                     </form>
     
                 </div>
             </div>
  )
}

export default Login