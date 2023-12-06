import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
      <div className='homepage-container'>
        <div className='text-container'>
          <h1>Welcome to 93/4!</h1>
          <p>
          93/4 is your one-stop destination for fashion-forward clothing and exquisite jewelry for both men and women. Step into a world of endless possibilities and let us redefine your shopping journey
          </p>
          <Link to='/943/shop'>
            <button>Shop Now</button>
          </Link>
        </div>
      </div>
  )
}
