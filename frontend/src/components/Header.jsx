import React from 'react'

const Header = () => {
  return (
    <>
    <div className='bg-sky-200 italic p-4 text-xl lg:p-8'>
        <div className='font-bold italic text-xl inline-block'>Task Management 
        </div>
    <div className='float-right md'>
        <a href='/login' className='px-2 hover:bg-white rounded'>Sign In </a>
        <a href='/register' className='px-2 hover:bg-white rounded'>Sign Up</a>  
    </div>
    </div>
    </>
  )
}

export default Header