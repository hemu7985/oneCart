import React, { useContext, useState } from 'react'
import logo from '../assets/vcart logo.png'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContex';
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';

function Nav() {
  let { getCurrentUser, userData } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
  let [showProfile, setShowProfile] = useState(false)
  let navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl+"/api/auth/logout", { withCredentials: true })
      console.log(result.data)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* TOP NAVBAR */}
      <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-20 fixed top-0 flex items-center justify-between px-[20px] shadow-md shadow-black'>

        {/* LOGO */}
        <div className='w-[30%] flex items-center gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className='w-[30px]' />
          <h1 className='text-[22px] md:text-[25px] font-sans text-black'>OneCart</h1>
        </div>

        {/* NAV LINKS (Desktop) */}
        <div className='hidden md:flex w-[40%] justify-center'>
          <ul className='flex items-center gap-[15px]'>
            <li className='text-[14px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[8px] px-[15px] rounded-2xl text-white' onClick={() => navigate("/")}>HOME</li>
            <li className='text-[14px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[8px] px-[15px] rounded-2xl text-white' onClick={() => navigate("/collections")}>COLLECTIONS</li>
            <li className='text-[14px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[8px] px-[15px] rounded-2xl text-white' onClick={() => navigate("/about")}>ABOUT</li>
            <li className='text-[14px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[8px] px-[15px] rounded-2xl text-white' onClick={() => navigate("/contact")}>CONTACT</li>
          </ul>
        </div>

        {/* ACTION ICONS */}
        <div className='w-[30%] flex items-center justify-end gap-[15px]'>
          {!showSearch && <IoSearchCircleOutline className='w-[30px] h-[30px] text-black cursor-pointer' onClick={() => { setShowSearch(prev => !prev); navigate("/collections") }} />}
          {showSearch && <IoSearchCircleSharp className='w-[30px] h-[30px] text-black cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />}

          {!userData && <FaCircleUser className='w-[28px] h-[28px] text-black cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />}
          {userData && (
            <div className='w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer'
              onClick={() => setShowProfile(prev => !prev)}>
              {userData?.name.slice(0, 1)}
            </div>
          )}

          <div className="relative hidden md:block">
            <MdOutlineShoppingCart className='w-[28px] h-[28px] text-black cursor-pointer' onClick={() => navigate("/cart")} />
            <p className='absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[10px]'>{getCartCount()}</p>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      {showSearch && (
        <div className='w-full h-[70px] bg-[#d8f6f9dd] fixed top-[70px] left-0 flex items-center justify-center z-10'>
          <input
            type="text"
            className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[20px] placeholder:text-white text-white text-[16px]'
            placeholder='Search Here'
            onChange={(e) => { setSearch(e.target.value) }}
            value={search}
          />
        </div>
      )}

      {/* PROFILE DROPDOWN */}
      {showProfile && (
        <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[80px] right-[4%] border border-[#aaa9a9] rounded-[10px] z-20'>
          <ul className='w-full h-full flex flex-col text-[15px] py-[10px] text-white'>
            {!userData && (
              <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
                onClick={() => { navigate("/login"); setShowProfile(false) }}>Login</li>
            )}
            {userData && (
              <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
                onClick={() => { handleLogout(); setShowProfile(false) }}>Logout</li>
            )}
            <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false) }}>Orders</li>
            <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/about"); setShowProfile(false) }}>About</li>
          </ul>
        </div>
      )}

      {/* BOTTOM NAVBAR (Mobile only) */}
      <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden z-20'>
        <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/")}>
          <IoMdHome className='w-[24px] h-[24px]' /> Home
        </button>
        <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/collections")}>
          <HiOutlineCollection className='w-[24px] h-[24px]' /> Collections
        </button>
        <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/contact")}>
          <MdContacts className='w-[24px] h-[24px]' /> Contact
        </button>
        <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/cart")}>
          <MdOutlineShoppingCart className='w-[24px] h-[24px]' /> Cart
        </button>
        <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white text-black font-semibold rounded-full text-[9px] top-[10px] right-[18px]'>{getCartCount()}</p>
      </div>
    </>
  )
}

export default Nav
