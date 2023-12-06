import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import allProductsData from '../../data/all'
import { Rating } from 'react-simple-star-rating'
import { CaretLeft } from 'phosphor-react'
import { useCart } from 'react-use-cart'

export const ShopDetails = () => {

    const { addItem } = useCart()
    const location = useLocation()
    const search=location.state?.search ||  ""
    const category = location.state?.category || "all"
    const params = useParams()
    const shopElement =  allProductsData.filter(shop => shop.id === params.id)

    const currentShopElement = shopElement.map(shop => {
        return(
            <div key={shop.id} className="shop-detail">
                <div className='current-image-container'>
                    <img src={ shop.image } alt="" className='current-image'/>
                </div>
                <div className='current-description'>
                    <h3>{ shop.title }</h3>
                    <p className="shop-price">${ shop.price }</p>
                    <div className='rating-container'>
                        <div className='rating-star'>
                            <Rating 
                                initialValue={shop.rating.rate}
                                allowFraction
                                readonly
                                size={25}
                                fillColor='#f1a545' 
                            />
                        </div>
                        <p className='shop-rating'>{shop.rating.rate} /{shop.rating.count}<span> comments</span></p>
                    </div>
                    <p className='shop-detail'>{ shop.description }</p>
                    <Link 
                        className="link-button"
                        onClick={() => addItem(shop)}
                    >Add To Cart
                </Link>
                </div>
            </div>
        )
    })
    return (
    <div>
        <Link 
            to={`..${search}`}
            relative="path" 
            className="back-button"
        >
            <CaretLeft size={20} />
            {
            category === "women" && 'Back to women'
            }
            {
            category === "men" && 'Back to men'
            }
            {
            category === "jewelery" && 'Back to jewelery'
            }
            {
            category === "all" && 'Back to all'
            }
        </Link>
        <div className='shop-element-container'>
        {currentShopElement}
        </div>
    </div>
    )
}

