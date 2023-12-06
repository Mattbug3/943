import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import { Icon } from '@iconify/react';
import { UserCircle } from 'phosphor-react'
import { useCart } from 'react-use-cart'
import { AuthContext } from '../context/Auth'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'


export const Navbar = () => {

  const { totalItems } = useCart()
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className='flex-container'>
        <div className='shopTitle'>
          <Link to='/943'>
            <h1>93/4</h1>
          </Link>
        </div>
        <div className='links'>
          <Link to='shop'>Shop</Link>
          <div className='navbar-totalItem-container'>
            <Link to='cart'>
              <ShoppingCart size={32} />
            </Link>
            <div 
              className='navbar-totalItem'
              style={{
                display : totalItems > 0 
                ? 'block' : 'none'
              }}
            >{totalItems}</div>
          </div>
          {
            currentUser && 
            <button 
              onClick={() => signOut(auth)}
              className='logout'
            >
              <img src={currentUser.photoURL} className='user-image'/>
              <p>Logout</p>
            </button>
          }
          {
            !currentUser &&
            <Link to='login' className='login'>
              <UserCircle size={32} />
              <p>Login</p>
            </Link>
          }
        </div>
      </div>
    </div>
    
  )
}
