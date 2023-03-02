import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Typography from '@mui/material/Typography'
import { width } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { CountDown, CustomSwitch, Header } from '../../components'
import { BASE_URL } from '../../helpers/axios'
import { useGetItemQuery, useAddbidMutation, useAutobiddingMutation } from '../../store/itemApi'
import "./style.scss"
import { CustomModal } from '../../components/CustomModal/CustomModal'

export const ItemDetails = () => {
    //get id from url params
    const { id } = useParams()
    const { data: item, isError, currentData } = useGetItemQuery(id)

    const [autoBid, setAutoBid] = useState(false)
    const [bidButtonDisabled, setBidButtonDisabled] = useState(true)
    const [bidAmount, setBidAmount] = useState(0)
    useEffect(() => {
        if (item && bidAmount > item.current_bid) setBidButtonDisabled(false)
        else setBidButtonDisabled(true)
    }, [bidAmount])

    useEffect(() => {
        console.log(item)
        if (item && item.isUserAutobidding) console.log("user is autobidding")
        if (item && item.isUserAutobidding)
            setAutoBid(true)
        else
            setAutoBid(false)

    }, [item])

    const [addBid, { isLoading: isAddBidLoading, isSuccess: isAddBidSuccess, data }] = useAddbidMutation()
    const [autoBidding, { isSuccess: isAutobiddingSucess }] = useAutobiddingMutation()
    const onChangeSwitch = async () => {

        try {
            const response: any = await autoBidding({ itemId: item.id, state: !autoBid })
            console.log("response", response)
            console.log(data)
            if (response.data) {
                toast.success(response.data.message);
                setAutoBid(!autoBid)
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Item Couldn't  activated auto bidding");
        }
    }


    const onBid = async () => {
        console.log("bid")
        try {
            const response: any = await addBid({ itemId: item.id, amount: bidAmount })
            if (response.data) {
                toast.success(response.data.message);
            }
        }
        catch {
            toast.error("Bid Couldn't be Added ");
        }
    }

    const [bidHistoryOpen, setBidHistoryOpen] = useState(false);

    return (
        <div>
            <Header />
            <ToastContainer />
            {item === undefined || item === null
                ? <div>item not found</div>
                : <div className="item-details">
                    <div className='left'>
                        <img src={BASE_URL + item.image} alt='' />
                    </div>
                    <div className='right'>
                        <div className='item-details__name'><span>{item.name}</span></div>
                        <div className='item-details__description'><strong>description:</strong> {item.description}</div>
                        {new Date(item.ending_Date) < new Date() ?
                            <Typography>
                                <p>the auction for this item is ended with the price of <strong>{item.current_bid}$</strong> </p>
                            </Typography>
                            :
                            <>                        <div className='item-details__price'>Current Price: {item.current_bid}$</div>
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
                                    <Button disabled={bidButtonDisabled} onClick={onBid} variant="contained" sx={{ height: '3.5rem', mb: "0.5rem", width: "50%" }}>Bid</Button>

                                </div>
                                <div className='bidding' >
                                    <CustomSwitch onChange={onChangeSwitch} label='Auto Bidding' enbled={autoBid} setEnbled={setAutoBid} />
                                    <CustomModal open={bidHistoryOpen} setOpen={setBidHistoryOpen} buttonComponent={
                                        <Button onClick={() => { setBidHistoryOpen(true) }} variant="contained" sx={{ height: '3.5rem', mb: "0.5rem", width: "50%" }}> bidding history</Button>
                                    }>

                                        <div className="bid-history">
                                            <div className='bid-history-row'>
                                                <div className='bid-history__name'>Name</div>
                                                <div className='bid-history__bid'>Bid</div>
                                                <div className='bid-history__date'>Date</div>
                                            </div>
                                            {item.bid.map((bid: any) => {
                                                return (
                                                    <div className='bid-history-row'>
                                                        <div className='bid-history__name'>{bid.user.username}</div>
                                                        <div className='bid-history__bid'><strong>{bid.bid_price}$</strong> </div>
                                                        <div className='bid-history__date'>{new Date(bid.createdAt).toLocaleString()}</div>
                                                    </div>)
                                            })
                                            }
                                        </div>
                                    </CustomModal>

                                </div>


                                <CountDown endofAuction={new Date(item.ending_Date)} />
                            </>

                        }
                    </div>

                </div>
            }
        </div>
    )
}
