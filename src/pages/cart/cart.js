import { Trash, Minus, Plus, SmileyXEyes } from "phosphor-react"
import { Icon } from '@iconify/react';
import React from "react"
import { Link } from "react-router-dom"
import { useCart } from "react-use-cart"


export const Cart = () => {

  const { 
      items,
      totalItems,
      isEmpty,
      cartTotal,
      updateItemQuantity,
      removeItem,
      emptyCart
  } = useCart()


  const handleCheckout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({items: items})
    }).then(res => {
      return res.json()
    }).then(res => {
      if(res.url){
        window.location.assign(res.url)
      }
    })
  }

  if(isEmpty){
    return (
      <div className="main-title-container">
        <div className="cart-main-title">
          <SmileyXEyes size={50} />
          <h1>Your Cart is Empty</h1>
        </div>
        <Link
          to='/943/shop'
          className="shop-now-btn"
        >
          Shop Now
        </Link>
      </div>
    )
  }else{
    return(
    <div>
      <section className="cart">
        <div className="total-items-container">
          <h3>Cart</h3>
          <h3>Item {totalItems} </h3>
        </div>
        <div className="cartItemContainer">     
        {items.map((item, index) => {
          return(
            <div key={index} className="cartItem">
              <img src = {item.image} className="itemImage"/>
              <div className="cart-info">
                <p className="cart-title">{item.title}</p>
                <div className="empty-div"></div>
                <div className="cart-description">
                  <div className="add-remove-btn">
                      <button 
                        onClick={() => updateItemQuantity(item.id, item.quantity-1)}
                      >
                        <Minus size={20}  className="minus-circle"/>
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity+1)}
                      >
                        <Plus size={20} className="plus-circle"/>
                      </button>
                    </div>
                    <div className="price-container">
                        <p className="cart-price">${item.price * item.quantity}</p>
                    </div>
                    <div className="remove-btn">
                      <button
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash size={25} className="trash-icon"/>
                      </button>
                    </div>
                </div>
              </div>
            </div>
          )
        })} 
        </div>  
        <div className="footer-btn-container">
          <div className="total-price-container">
            <h2>Total: ${(Math.round(cartTotal*100)/100).toFixed(2)}</h2>
          </div>
          <div className="clear-payment-btn-container">
            <button
              className="clear-cart-btn"
              onClick={() => emptyCart()}
            >
              <Icon icon="carbon:shopping-cart-clear" />
              <p>Clear Cart</p>
            </button>
            <button 
              onClick={handleCheckout}
              className="payment-btn"
            >
              <Icon icon="material-symbols:shopping-cart-checkout-sharp" />
              <p>Check Out</p>
            </button>
          </div>
        </div>
      </section>
    </div>
    )
  }
  
}
