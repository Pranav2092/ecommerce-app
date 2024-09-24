import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
      <div className='text-center'>
          <p className='text-2xl font-medium text-gray-800'>Subscribe Now & Get 20% Off</p>
          <p className='text-gray-400 mt-3'>Subscribe to our newsletter and get 20% off on your first purchase.</p>
          <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-full' onSubmit={onSubmitHandler}>
              <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email address' required />
              <button type='submit' className='bg-black text-white text-xs px-10 py-4 rounded-full'>SUBSCRIBE</button>
          </form>
    </div>
  )
}

export default NewsLetterBox