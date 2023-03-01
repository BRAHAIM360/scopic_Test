import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { TextField } from '@mui/material';
import { useEditConfigMutation, useGetMeQuery } from '../../store/userApi';
import "./style.scss"
import { CustomButton } from '../Button/Button';
import { CustomTextField } from '../CustomTextField/CustomTextField';
import { toast } from 'react-toastify';

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    ButtonTriger: JSX.Element;
}

export const Drawer = ({ children, ButtonTriger }: DrawerProps) => {

    const [open, setOpen] = React.useState(false);
    const [bidAmount, setBidAmount] = React.useState(0);
    const [maxBid, setMaxBid] = React.useState(0);
    const [bidAlert, setBidAlert] = React.useState(0);
    const { data: meInfo } = useGetMeQuery("");

    React.useEffect(() => {
        console.log("meInfo", meInfo);
        if (meInfo) {
            setBidAmount(meInfo.bid_amount);
            setMaxBid(meInfo.max_bid);
            setBidAlert(meInfo.bid_alert);
        }
    }, [meInfo]);

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setOpen(open);
            };
    const [editConfig] = useEditConfigMutation();

    const onUpdateSettings = () => {
        editConfig({
            bid_amount: bidAmount,
            max_bid: maxBid,
            bid_alert: bidAlert
        }).unwrap().then((res) => {
            toast.success("Settings Updated Successfully");
        })
    }

    const content = () => (
        <div className='drawer-container' >
            <h1>Settings</h1>
            <CustomTextField sx={{}}
                required
                id="outlined-required"
                label="Bid Amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(parseInt(e.target.value))}
                type="number"
                start="$"
            />

            <CustomTextField
                required
                id="outlined-required"
                label="Max Bid for the bot"
                value={maxBid}
                onChange={(e) => setMaxBid(parseInt(e.target.value))}
                type="number"
                start="$"
            />

            <CustomTextField
                required
                id="outlined-required"
                label="Bid Alert"
                value={bidAlert}
                onChange={(e) => setBidAlert(parseInt(e.target.value))}
                type="number"
                start="%"
            />

            <CustomButton onClick={onUpdateSettings} >update</CustomButton>
        </div>
    );

    return (
        <div >

            <React.Fragment key={"anchor"} >
                <div onClick={() => setOpen(true)}>
                    {ButtonTriger}
                </div>
                <SwipeableDrawer
                    anchor={"left"}
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    style={{}}
                >
                    {content()}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}