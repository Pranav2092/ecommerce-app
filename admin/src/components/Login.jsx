import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(backendUrl + '/api/user/admin', { email, password }); 
            if (res.data.success) {
                setToken(res.data.token);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message); 
        }
    }
  return (
      <div className='min-h-screen flex items-center justify-center w-full'>
          <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
              <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
              <form onSubmit={onSubmitHandler}>
                  <div className='mb-3 min-w-72'>
                      <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                      <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-full w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder="your@email.com" required />
                  </div>
                  <div className='mb-3 min-w-72'>
                      <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                      <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-full w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder="Enter your password" required />
                  </div>
                  <button type='submit' className='rounded-full bg-black text-white font-medium px-4 py-2 mt-2 w-full '>Login</button>
              </form>
          </div>
    </div>
  )
}

export default Login