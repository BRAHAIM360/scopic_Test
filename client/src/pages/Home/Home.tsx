import React from 'react'
import { ItemCard, ItemProps } from '../../components';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/auth/authSlice';
import "./style.scss"

const items: ItemProps[] = [
    {
        id: 1,
        name: "item1",
        description: "item1 description",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },
    {
        id: 2,
        name: "item2",
        description: "item2 description",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },
    {
        id: 3,
        name: "item3",
        description: "item3 description",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },
    {
        id: 4,
        name: "item1",
        description: "item1 description",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },
    {
        id: 5,
        name: "item2",
        description: "item2 description",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },
    {
        id: 6,
        name: "item3",
        description: "item3 description",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },

]

export const Home = () => {
    const dispatch = useAppDispatch();
    return (
        <div className='home'>
            <h1>Home</h1>
            <button onClick={() => { dispatch(logout()) }}>Logout</button>
            <div className="home__items">
                {items.map(item => { return <ItemCard key={item.id} {...item} /> })}
            </div>
        </div>
    )
}
