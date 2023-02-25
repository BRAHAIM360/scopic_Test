import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetItemQuery } from '../../store/itemApi'
import "./style.scss"


export const ItemDetails = () => {
    //get id from url params
    const { id } = useParams()
    const { data: item, isError, currentData } = useGetItemQuery(id)
    useEffect(() => {
        console.log("items is ", item)
    }, [item])

    return (
        item === null
            ? <div>item not found</div>
            : <div className="item-details">
                <span className="item-details__title">{item?.name}</span>
                <br />
                <span className="item-details__description">{item?.description}</span>
                <div className="item-details__image">
                    <img src={item?.image} alt="" />
                </div>
            </div>

    )
}
