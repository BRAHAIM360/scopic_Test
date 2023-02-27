import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SxProps } from '@mui/system';

const style: SxProps = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5
};

interface CustomButtonProps {
    buttonComponent: JSX.Element
    children: JSX.Element,
    open: boolean,
    setOpen: (val: boolean) => void
}

export const CustomModal = ({ buttonComponent, children, open, setOpen }: CustomButtonProps) => {
    const handleClose = () => setOpen(false);

    return (
        <div>
            {buttonComponent}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}