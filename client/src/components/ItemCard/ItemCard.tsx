import React from 'react'
import "./style.scss"

export interface ItemProps {
    id: number;
    name: string;
    description: string;
    image: string;
    endOfAuction: Date;
    currentPrice: number;
}

export const ItemCard = ({ id, name, description, currentPrice, endOfAuction, image }: ItemProps) => {
    return (
        <div className="item-card">
            <img className='item-card__image' src={image} alt="Denim Jeans" />
            <h1 className='item-card__title'>{name}</h1>
            <p className="item-card__price">${currentPrice}</p>
            <p className='item-card__description'>{description}</p>
            <button className='item-card__button' onClick={() => { }}>Add to Cart</button>
        </div>
    )
}