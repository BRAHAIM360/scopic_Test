import React from 'react'
import { ItemCard, ItemCardProps, Header, SearchInput, DropDown } from '../../components';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/auth/authSlice';
import { redirect } from "react-router-dom";
import "./style.scss"


const items: ItemCardProps[] = [
    {
        id: 1,
        name: "item1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },
    {
        id: 2,
        name: "item2",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },
    {
        id: 3,
        name: "item3",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },
    {
        id: 4,
        name: "item1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },
    {
        id: 5,
        name: "item2",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },
    {
        id: 6,
        name: "item3",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "/images/bg.jpeg",
        endOfAuction: new Date(),
        currentPrice: 100
    },


]

export const Home = () => {
    const [search, setSearch] = React.useState<string>('');
    const dispatch = useAppDispatch();
    return (
        <div className='home'>
            <Header />
            <h1>Home</h1>
            <div className='top'>
                <SearchInput searchText={search} setSearchText={setSearch} />
                <DropDown options={[{ name: "by name", action: () => { } }]} />
            </div>
            <div className="home__items">
                {items.map(item => { return <ItemCard key={item.id}  {...item} buttonAction={() => { redirect(`items/${item.id}`); }} /> })}
            </div>
        </div>
    )
}
