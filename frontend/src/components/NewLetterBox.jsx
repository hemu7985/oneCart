import React from 'react'

function NewLetterBox() {

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Form Submitted")
  }

  return (
    <div className='w-full min-h-[40vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center gap-[20px] flex-col py-[40px]'>
      
      {/* Heading */}
      <p className='md:text-[30px] text-[20px] text-[#a5faf7] font-semibold px-[20px] text-center'>
        Subscribe now & get 20% off
      </p>

      {/* Sub text */}
      <p className='md:text-[18px] text-[14px] text-center text-blue-100 font-semibold px-[20px]'>
        Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
      </p>

      {/* Form */}
      <form 
        onSubmit={handleSubmit} 
        className='w-full flex items-center justify-center mt-[20px] gap-[20px] px-[20px] flex-wrap'
      >
        <input 
          type="email" 
          placeholder='Enter Your Email' 
          className='placeholder:text-black bg-slate-300 w-[600px] max-w-[90%] h-[40px] px-[20px] rounded-lg shadow-sm shadow-black'
          required 
        />
        <button 
          type='submit' 
          className='text-[15px] md:text-[16px] px-[20px] py-[10px] hover:bg-slate-500 cursor-pointer bg-[#2e3030c9] text-white border border-gray-400 rounded-lg shadow-sm shadow-black'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewLetterBox
