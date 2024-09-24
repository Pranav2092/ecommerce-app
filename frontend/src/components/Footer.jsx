import React from 'react' 
import {assets} from '../assets/assets'
const Footer = () => {
  return (
      <div className=''>
          <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
              <div>
                  <img src={assets.logo} className='mb-5 w-32' alt="" />
                  <p className='w-full md:w-2/3 text-gray-600'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aut veniam sint est dolore repellat sunt, natus obcaecati itaque delectus, minima optio nobis repellendus corporis fugit labore doloremque! Laudantium, voluptatem. 
                  </p>
              </div>
              <div>
                  <p className='text-xl font-medium mb-5'>Company</p>
                  <ul className='flex flex-col gap-1 text-fray-600'>
                      <li>Home</li>
                      <li>About Us</li>
                      <li>Delivery</li>
                      <li>Privacy Policy</li>
                  </ul>
              </div>
              <div>
                  <p className='text-xl font medium mb-5'>Get In Touch</p>
                  <ul className='flex flex-col gap-1 text-fray-600'>
                      <li>+91 123456789</li>
                      <li>contact@forever.com</li>
                  </ul>
              </div>
          </div>
          <div>
              <hr />
              <p className='text-center text-sm py-5'>© 2024. All rights reserved</p>
          </div>
    </div>
  )
}

export default Footer