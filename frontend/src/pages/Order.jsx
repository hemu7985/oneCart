import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
  let [orderData, setOrderData] = useState([])
  let { currency } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  return (
    <div className='w-full min-h-screen p-4 md:p-8 lg:p-10 pb-[120px] bg-gradient-to-l from-[#141414] to-[#0c2025] overflow-y-auto'>
      
      {/* Page Title */}
      <div className='text-center mt-[80px] mb-8'>
        <Title text1={'MY'} text2={'ORDER'} />
      </div>

      {/* Orders List */}
      <div className='flex flex-col gap-6'>
        {orderData.map((item, index) => (
          <div
            key={index}
            className='w-full bg-[#51808048] border border-gray-600 rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4 md:gap-6'
          >
            {/* Product Image */}
            <div className='flex-shrink-0 flex items-center justify-center'>
              <img
                src={item.image1}
                alt={item.name}
                className='w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-md object-cover'
              />
            </div>

            {/* Order Info */}
            <div className='flex flex-col flex-1 gap-2 text-white'>
              <p className='text-[18px] md:text-[22px] lg:text-[24px] font-semibold text-[#f3f9fc]'>
                {item.name}
              </p>

              <div className='flex flex-wrap gap-4 text-[#aaf4e7] text-[12px] md:text-[16px]'>
                <p>{currency} {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>

              <p className='text-[#aaf4e7] text-[12px] md:text-[15px]'>
                Date: 
                <span className='text-[#e4fbff] ml-2'>
                  {new Date(item.date).toDateString()}
                </span>
              </p>

              <p className='text-[#aaf4e7] text-[12px] md:text-[15px]'>
                Payment Method: <span className='text-white'>{item.paymentMethod}</span>
              </p>

              {/* Status + Track Order Button */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between mt-2 gap-2'>
                
                {/* Status */}
                <div className='flex items-center gap-2'>
                  <span className='w-3 h-3 rounded-full bg-green-500'></span>
                  <p className='text-[#f3f9fc] text-[12px] md:text-[15px]'>{item.status}</p>
                </div>

                {/* Track Order Button */}
                <button
                  className='px-3 py-2 md:px-5 md:py-2 rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] md:text-[14px] hover:bg-[#1e2d2d] transition active:scale-95'
                  onClick={loadOrderData}
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
