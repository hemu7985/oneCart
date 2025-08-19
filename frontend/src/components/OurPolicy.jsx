import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full min-h-[70vh]  flex items-center justify-start flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[40px] py-[40px]'>
        
        {/* Heading */}
        <div className='text-center '>
            <Title text1={"OUR"} text2={"POLICY"}/>
            <p className='w-full m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>
              Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
            </p>
        </div>

        {/* Policy Cards */}
        <div className='w-full flex items-center justify-center flex-wrap lg:gap-[50px] gap-[40px]'>
          
          {/* Easy Exchange */}
          <div className='w-[350px] max-w-[90%] flex items-center justify-center flex-col gap-[10px] text-center'>
            <RiExchangeFundsLine className='md:w-[60px] w-[40px] h-[40px] md:h-[60px] text-[#90b9ff]'/>
            <p className='font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]'>Easy Exchange Policy</p>
            <p className='font-semibold md:text-[18px] text-[13px] text-[aliceblue]'>
              Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
            </p>
          </div>

          {/* 7 Days Return */}
          <div className='w-[350px] max-w-[90%] flex items-center justify-center flex-col gap-[10px] text-center'>
            <TbRosetteDiscountCheckFilled className='md:w-[60px] w-[40px] h-[40px] md:h-[60px] text-[#90b9ff]'/>
            <p className='font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]'>7 Days Return Policy</p>
            <p className='font-semibold md:text-[18px] text-[13px] text-[aliceblue]'>
              Shop with Confidence – 7 Days Easy Return Guarantee.
            </p>
          </div>

          {/* Customer Support */}
          <div className='w-[350px] max-w-[90%] flex items-center justify-center flex-col gap-[10px] text-center'>
            <BiSupport className='md:w-[60px] w-[40px] h-[40px] md:h-[60px] text-[#90b9ff]'/>
            <p className='font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]'>Best Customer Support</p>
            <p className='font-semibold md:text-[18px] text-[13px] text-[aliceblue]'>
              Trusted Customer Support – Your Satisfaction Is Our Priority.
            </p>
          </div>
        </div>
    </div>
  )
}

export default OurPolicy
