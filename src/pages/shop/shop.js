import React from 'react'
import allProductsData from '../../data/all'
import { useSearchParams, Link} from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { DotsThreeOutline, ShoppingCart } from 'phosphor-react'


export const Shop = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const { addItem, items, updateItemQuantity } = useCart()

  function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
      if (value === null) {
          prevParams.delete(key)
      } else {
          prevParams.set(key, value)
      }
      return prevParams
    })
  }

  function handleClick(shop){
    addItem(shop)
    handleItems(shop)
  }

  function handleItems(shop){
    const newItems = items.filter(item => item.id === shop.id)
    return newItems.map(item => updateItemQuantity(item.id, item.quantity+1))
  }

  const paramsType = searchParams.get("category")

  const shopData = paramsType 
    ? allProductsData.filter(shop => shop.category.toLowerCase() === paramsType) 
    : allProductsData


  return(
    <>
      <div className="shop-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("category", null)}
          className={
            `shop-category clear-filters 
              ${paramsType === null ? "selected" : ""}`
          }
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("category", "men")}
          className={
            `shop-category men 
            ${paramsType === "men" ? "selected" : ""}`
          }
        >
          Men
        </button>
        <button
          onClick={() => handleFilterChange("category", "women")}
          className={
            `shop-category women
            ${paramsType === "women" ? "selected" : ""}`
          }
        >
          Women
        </button>
        <button
          onClick={() => handleFilterChange("category", "jewelery")}
          className={
            `shop-category jewelery  
            ${paramsType === "jewelery" ? "selected" : ""}`
          }
        >
          Jewelery
        </button>
      </div>
      <div className='products'>
        {
          shopData.map(shop => {
            const shopnum = 0;
            return(
              <div className='product' key={shop.id}>
                <div className='image-container'>
                  <img src={ shop.image }/>
                </div>
                <div className='description'>
                  <p className='title'>{shop.title}</p>
                  <p className='price'>${shop.price}</p>
                </div>
                <div className='button-container'>
                <button 
                  className='addToCartBtn' 
                  onClick={() => handleClick(shop)}
                >
                  <div className='cart-icon-container'>
                    <ShoppingCart size={20} />
                  </div>
                  <div>
                    {handleItems}
                  </div>
                  <p>Add To Cart</p>
                </button>
                <Link
                  to={shop.id} 
                  state={{ search: `?${searchParams.toString()}`, category: paramsType}}
                > 
                <button 
                  className='details' 
                  onClick={() => handleClick(shop)}
                > 
                   <div className='cart-icon-container'>
                    <DotsThreeOutline size={20} />
                  </div> 
                  <div>
                    {handleItems}
                  </div> 
                  <p>Details</p>
                </button>
                </Link> 
                </div>
              </div>     
            )
          })
        }
      </div>
    </>
  )
}


