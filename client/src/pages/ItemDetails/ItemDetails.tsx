import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { width } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CountDown, CustomSwitch, Header } from '../../components'
import { useGetItemQuery } from '../../store/itemApi'
import "./style.scss"


export const ItemDetails = () => {
    //get id from url params
    const { id } = useParams()
    // const { data: item, isError, currentData } = useGetItemQuery(id)
    // useEffect(() => {
    //     console.log("items is", item)
    // }, [item])
    const [autoBid, setAutoBid] = useState(false)
    const [bidButtonDisabled, setBidButtonDisabled] = useState(true)
    const [bidAmount, setBidAmount] = useState(0)
    useEffect(() => {
        if (bidAmount > 0) setBidButtonDisabled(false)
        else setBidButtonDisabled(true)
    }, [bidAmount])

    const item = {
        name: "item name",
        description: "item description"
    }
    return (
        <>
            <Header />
            {item === null
                ? <div>item not found</div>
                : <div className="item-details">
                    <div className='left'>
                        <img src='/images/bg.jpeg' alt='' />
                    </div>
                    <div className='right'>
                        <div className='item-details__name'><span>{item.name}</span></div>
                        <div className='item-details__description'>{item.description}</div>
                        <div className='item-details__price'>Current Price: 561$</div>
                        <div className='bid'>
                            <FormControl sx={{ height: '4rem' }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Amount"
                                    value={bidAmount}
                                    type="number"
                                    onChange={(e) => { setBidAmount(parseInt(e.target.value)) }}
                                />
                            </FormControl>
                            <Button disabled={bidButtonDisabled} variant="contained" sx={{ height: '3.5rem', mb: "0.5rem", width: "50%" }}>Bid</Button>

                        </div>
                        <CustomSwitch label='Auto Bidding' enbled={autoBid} setEnbled={setAutoBid} />

                        <CountDown endofAuction={new Date("2023-05-31T23:59:59")} />
                    </div>

                </div>
            }
        </>
    )
}
