import React from 'react'
import "./style.scss";
import Button, { ButtonProps } from '@mui/material/Button';



export const CustomButton = (props: ButtonProps): JSX.Element => {
    return <Button variant="contained" {...props}>{props.children}</Button>

}