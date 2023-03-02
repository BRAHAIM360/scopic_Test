import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface MessageBoxProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    title?: string;
    content?: string | JSX.Element | JSX.Element;
    onSubmit?: () => void;
    children?: React.ReactNode;
    component?: React.ReactNode;

}

export const MessageBox = ({ title, content, onSubmit, children, component }: MessageBoxProps) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div onClick={handleClickOpen}>
                {children}
            </div>

            <Dialog
                open={open || false}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {
                    component ? component
                        :
                        <>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    {content}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>NO</Button>
                                <Button onClick={() => { handleClose(); onSubmit && onSubmit() }}>YES</Button>
                            </DialogActions>
                        </>
                }



            </Dialog>
        </>
    );
}