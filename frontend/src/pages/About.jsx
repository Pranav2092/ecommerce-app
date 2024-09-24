import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'} />
        
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, dolores odio molestias perspiciatis expedita ullam quisquam saepe adipisci officiis officia nulla velit nesciunt neque. Saepe nostrum excepturi ipsum corrupti laboriosam.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti mollitia vel, quo ex delectus, corrupti eaque cumque necessitatibus temporibus vitae incidunt ut laborum asperiores voluptas culpa eius quas, quia fuga!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt corrupti dolores explicabo, saepe, eos adipisci distinctio et dicta dolor beatae aut quas repudiandae necessitatibus similique porro dolorem. A, veritatis quae?</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas officia ea odio veniam atque ducimus dolore odit, unde, quasi dolorem illum animi ut temporibus dignissimos facilis dicta rerum hic impedit?</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'Why'} text2={'Choose us'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-6'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-md'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui non similique est perspiciatis officia officiis veniam, molestiae animi illo voluptatibus laborum obcaecati distinctio, a ab ut aut, tenetur commodi itaque.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-md'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui non similique est perspiciatis officia officiis veniam, molestiae animi illo voluptatibus laborum obcaecati distinctio, a ab ut aut, tenetur commodi itaque.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 rounded-md'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui non similique est perspiciatis officia officiis veniam, molestiae animi illo voluptatibus laborum obcaecati distinctio, a ab ut aut, tenetur commodi itaque.</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About