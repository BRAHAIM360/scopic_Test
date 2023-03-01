import React, { useEffect, useState } from 'react'
import { ItemCard, ItemCardProps, Header, SearchInput, DropDown } from '../../components';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/auth/authSlice';
import { redirect } from "react-router-dom";
import "./style.scss"
import { useGetItemsQuery } from '../../store/itemApi';
import { getQueryParams } from '../../helpers/getQueryParamsString';
import { Divider } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Card from '@mui/material/Card';

// const items: ItemCardProps[] = [
//     {
//         id: 1,
//         name: "item1",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         image: "/images/bg.jpeg",
//         endOfAuction: new Date(),
//         currentPrice: 100
//     },
//     {
//         id: 2,
//         name: "item2",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         image: "/images/bg.jpeg",
//         endOfAuction: new Date(),
//         currentPrice: 100
//     },
//     {
//         id: 3,
//         name: "item3",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         image: "/images/bg.jpeg",
//         endOfAuction: new Date(),
//         currentPrice: 100
//     },
//     {
//         id: 4,
//         name: "item1",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         image: "/images/bg.jpeg",
//         endOfAuction: new Date(),
//         currentPrice: 100
//     },
//     {
//         id: 5,
//         name: "item2",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         image: "/images/bg.jpeg",
//         endOfAuction: new Date(),
//         currentPrice: 100
//     },
//     {
//         id: 6,
//         name: "item3",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         image: "/images/bg.jpeg",
//         endOfAuction: new Date(),
//         currentPrice: 100
//     },


// ]

export const Home = () => {
    const [search, setSearch] = useState<string>("");
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(10);
    const [queryParams, setQueryParams] = useState({});
    const [queryParamsString, setQueryParamsString] = useState(
        `?page=${page}&take=${take}`
    );
    //  [sort_by]: order,
    const [orderBy, setOrderBy] = useState({ sort_by: "id", order: "asc" });
    useEffect(() => {
        setQueryParams({ ...queryParams, ...orderBy });
        console.log(queryParams)
    }, [orderBy]);

    const { data } = useGetItemsQuery(queryParamsString);
    useEffect(() => {
        let params;
        params = `?page=${page}&take=${take}${getQueryParams(queryParams)}`;
        setQueryParamsString(params);
    }, [page, take, queryParams]);

    useEffect(() => {
        setQueryParams({ ...queryParams, search });
    }, [search]);

    return (
        <>
            <Header />
            <div className='home'>
                <div>
                    <h1>Home</h1>
                    <Divider sx={{ marginLeft: '5%', marginRight: '5%' }} />
                    <div className='top'>
                        <SearchInput searchText={search} setSearchText={setSearch} />
                        <DropDown options={[
                            { name: "default", action: () => { setOrderBy({ sort_by: "id", order: "asc" }) } },
                            { name: "by name asc", action: () => { setOrderBy({ sort_by: "name", order: "asc" }) } },
                            { name: "by name desc", action: () => { setOrderBy({ sort_by: "name", order: "desc" }) } },
                            { name: "by the current bid asc ", action: () => { setOrderBy({ sort_by: "current_bid", order: "asc" }) } },
                            { name: "by the current bid des", action: () => { setOrderBy({ sort_by: "current_bid", order: "asc" }) } },
                        ]} />
                    </div>
                </div>
                <div className="home__items">
                    {data?.items?.map((item: any) => { return <ItemCard key={item.id}  {...item} buttonAction={() => { redirect(`items/${item.id}`); }} /> })}
                </div>
                <div className="home__pagination">
                    <Card sx={{ display: "flex", justifyContent: "center" }}>
                        <Pagination count={data && data.pageinfo.pages} color="primary" page={page} onChange={(event: React.ChangeEvent<unknown>, value: number) => { setPage(value); }} />
                    </Card>
                </div>
            </div>
        </>
    )
}
