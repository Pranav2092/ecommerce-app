import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Placeorder = () => {

  const { navigate, backendUrl, token, cartitems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response , { headers: { token } });
          if (data.success) {
            navigate('/orders');
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [] 
      for (const items in cartitems) {
        for(const item in cartitems[items]){
          if(cartitems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartitems[items][item];
              orderItems.push(itemInfo);
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
        // api calls for cod 
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
            
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;
        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left sife */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        <div className='flex gap-3'>
          <input required type="text" onChange={onChangeHandler} name='firstName' value={formData.firstName} placeholder='First Name' className='w-full border border-gray-300 px-3.5 py-1.5 rounded-full' />
          <input required type="text" onChange={onChangeHandler} name='lastName' value={formData.lastName} placeholder='Last Name' className='w-full border border-gray-300 px-3.5 py-1.5 rounded-full' />
        </div>
        <input required type="email" onChange={onChangeHandler} name='email' value={formData.email} placeholder='Email' className='w-full border border-gray-300 px-3.5 py-1.5 rounded-full' />
        <input required type="text" onChange={onChangeHandler} name='street' value={formData.street} placeholder='Street' className='w-full border border-gray-300 px-3.5 py-1.5 rounded-full' />
        <div className='flex gap-3'>
          <input required type="text" onChange={onChangeHandler} name='city' value={formData.city} placeholder='City' className='w-full border border-gray-300 px-3.5 py-1.5 rounded-full' />
          <input required type="text" onChange={onChangeHandler} name='state' value={formData.state} placeholder='State' className='w-full border border-gray-300 px-3.5 py-1.5 rounded-full' />
        </div>
        <div className='flex gap-3'>
          <input required type="number" onChange={onChangeHandler} name='pincode' value={formData.pincode} placeholder='Pincode' className='w-full border border-gray-300 px-3.5 py-1.5 rounded-full' />
          <input required type="text" onChange={onChangeHandler} name='country' value={formData.country} placeholder='Country' className='w-full border border-gray-300 px-3.5 py-1.5 rounded-full' />
        </div>
        <input required type="number" onChange={onChangeHandler} name='phone' value={formData.phone} placeholder='Phone Number' className='w-full border border-gray-300 px-3.5 py-1.5 rounded-full' />
      </div>

      {/* right side */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'} />
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-black' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-black' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-black' : ''}`}></p>
              <p className='text-sm text-gray-500 font-medium mx-4'>Cash on Delivery</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-8 py-2 rounded-full'>Place Order</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder