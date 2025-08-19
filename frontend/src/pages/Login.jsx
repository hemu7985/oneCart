import React, { useState, useContext } from 'react'
import Logo from '../assets/vcart logo.png'
import Googlelogo from '../assets/G.png'
import { useNavigate } from 'react-router-dom'
import { PiEyeSlash } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContex'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';

const Login = () => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { serverUrl } = useContext(authDataContext)
  const { getCurrentUser } = useContext(userDataContext)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(
        serverUrl + '/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      console.log(result.data)
      await getCurrentUser();
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const googlelogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + '/api/auth/googlelogin',
        { name, email },
        { withCredentials: true }
      );
      console.log(result.data);

      getCurrentUser()
      navigate("/")
    } catch (error) {
      console.error("Google Signup Error:", error);
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start' >
      
      {/* Header */}
      <div className='w-full h-[80px] flex items-center justify-start mt-[5px] px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
        <img className='w-[40px]' src={Logo} alt='logo' />
        <h1 className='text-[22px] font-sans'>OneCart</h1>
      </div>

      {/* Title */}
      <div className='w-full h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Login Page</span>
        <span className='text-[16px]'>Welcome to OneCart, Place your order</span>
      </div>

      {/* Form */}
      <div className='max-w-[600px] w-[90%] mt-[10px] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center' >
        <form onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
          
          {/* Google Login */}
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googlelogin}>
            <img src={Googlelogo} alt="google" className='w-[20px]' /> Login account with Google
          </div>

          {/* Divider */}
          <div className='w-full h-[20px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>Or
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

          {/* Inputs */}
          <div className='w-[90%] flex flex-col items-center justify-center gap-[15px] relative'>

            {/* Email Input */}
            <input
              type="email"
              className='w-full h-[50px] border border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Email'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            {/* Password Input with Eye Icon */}
            <div className="w-full relative">
              <input
                type={show ? "text" : "password"}
                className="w-full h-[50px] border border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] pr-[40px] font-semibold"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {!show ? (
                <PiEyeSlash
                  className="w-[20px] h-[20px] cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShow((prev) => !prev)}
                />
              ) : (
                <FaEye
                  className="w-[20px] h-[20px] cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShow((prev) => !prev)}
                />
              )}
            </div>

            {/* Login Button */}
            <button className='w-full h-[50px] mt-[20px] text-[17px] bg-[#6060f5] border rounded-lg shadow-lg px-[20px] font-semibold cursor-pointer hover:bg-blue-900'>
              Login
            </button>

            {/* Signup Link */}
            <p className='flex gap-[10px]'>
              You haven't any account?
              <span
                className='text-[#5555f6cf] font-semibold text-[17px] cursor-pointer'
                onClick={() => navigate('/signup')}
              >
                Create New Account
              </span>
            </p>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
