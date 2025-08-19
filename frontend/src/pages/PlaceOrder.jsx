import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

function PlaceOrder() {
  let [method, setMethod] = useState('cod')
  let navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)
  let [loading, setLoading] = useState(false)

  let [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
        if (data) {
          navigate("/order")
          setCartItem({})
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
          console.log(result.data)
          if (result.data) {
            setCartItem({})
            toast.success("Order Placed")
            navigate("/order")
          } else {
            toast.error("Order Place Error")
          }
          break;

        case 'razorpay':
          const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
          if (resultRazorpay.data) {
            initPay(resultRazorpay.data)
            toast.success("Redirecting to Payment")
          }
          break;

        default:
          break;
      }

      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-start justify-center gap-8 px-4 py-10'>

      {/* Left Form Section */}
      <div className='lg:w-1/2 w-full flex justify-center'>
        <form onSubmit={onSubmitHandler} className='w-full max-w-xl bg-[#1f1f1f3a] p-6 rounded-xl shadow-md'>
          <div className='mb-4'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          {/* Name Inputs */}
          <div className='flex gap-4 mb-4'>
            <input type="text" placeholder='First name' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 text-[16px]' required onChange={onChangeHandler} name='firstName' value={formData.firstName} />
            <input type="text" placeholder='Last name' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 text-[16px]' required onChange={onChangeHandler} name='lastName' value={formData.lastName} />
          </div>

          <input type="email" placeholder='Email address' className='w-full h-12 rounded-md bg-slate-700 text-white px-4 text-[16px] mb-4' required onChange={onChangeHandler} name='email' value={formData.email} />

          <input type="text" placeholder='Street' className='w-full h-12 rounded-md bg-slate-700 text-white px-4 text-[16px] mb-4' required onChange={onChangeHandler} name='street' value={formData.street} />

          <div className='flex gap-4 mb-4'>
            <input type="text" placeholder='City' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 text-[16px]' required onChange={onChangeHandler} name='city' value={formData.city} />
            <input type="text" placeholder='State' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 text-[16px]' required onChange={onChangeHandler} name='state' value={formData.state} />
          </div>

          <div className='flex gap-4 mb-4'>
            <input type="text" placeholder='Pincode' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 text-[16px]' required onChange={onChangeHandler} name='pinCode' value={formData.pinCode} />
            <input type="text" placeholder='Country' className='w-1/2 h-12 rounded-md bg-slate-700 text-white px-4 text-[16px]' required onChange={onChangeHandler} name='country' value={formData.country} />
          </div>

          <input type="text" placeholder='Phone' className='w-full h-12 rounded-md bg-slate-700 text-white px-4 text-[16px] mb-6' required onChange={onChangeHandler} name='phone' value={formData.phone} />

          <button type='submit' className='w-full text-[18px] bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-white flex items-center justify-center gap-3 transition'>
            {loading ? <Loading /> : "PLACE ORDER"}
          </button>
        </form>
      </div>

      {/* Right Cart + Payment Section */}
      <div className='lg:w-1/2 w-full flex flex-col items-center gap-6'>
        <div className='w-full max-w-xl bg-[#1f1f1f3a] p-6 rounded-xl shadow-md'>
          <CartTotal />
        </div>

        <div className='w-full max-w-xl bg-[#1f1f1f3a] p-6 rounded-xl shadow-md flex flex-col items-center'>
          <div className='mb-4'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
          </div>

          <div className='flex items-center justify-center gap-6 flex-wrap'>
            <button onClick={() => setMethod('razorpay')} className={`w-[150px] h-[60px] flex items-center justify-center rounded-md border transition ${method === 'razorpay' ? 'border-[4px] border-blue-600' : 'border-gray-400'}`}>
              <img src={razorpay} className='w-full h-full object-contain p-2' alt="razorpay" />
            </button>

            <button onClick={() => setMethod('cod')} className={`w-[200px] h-[60px] flex items-center justify-center text-[14px] rounded-md font-bold transition 
              ${method === 'cod'
                ? 'border-[4px] border-blue-600 bg-gradient-to-t from-[#95b3f8] to-white text-[#332f6f]'
                : 'border border-gray-400 bg-gradient-to-t from-[#dce6ff] to-white text-[#332f6f]'}`}>
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrder
