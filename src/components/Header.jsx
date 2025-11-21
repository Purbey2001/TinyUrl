import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='w-full text-center bg-gray-600 text-black text-3xl font-bold shadow-md shadow-gray-900 py-2'>
    <Link to="/">
      TinyLink Dashboard
    </Link>
    </div>
  )
}

export default Header