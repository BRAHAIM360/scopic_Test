import React from 'react'
import { useAppDispatch } from '../../store';
import { logout } from '../../store/auth/authSlice';
import "./style.scss"


export const Home = () => {
    const dispatch = useAppDispatch();


    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => { dispatch(logout()) }}>Logout</button>
        </div>
    )
}
