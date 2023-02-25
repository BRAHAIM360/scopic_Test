import React, { useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { login, logout } from '../../store/auth/authSlice';
import { useGetItemsQuery } from '../../store/itemApi'
import "./style.scss"


export const Login = () => {

    const { isLogged, isLoading, isError, isLoginSuccess, message } = useAppSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="box">
            <div className="container">
                <div className='header'>
                    <h1>WEB AUCTION</h1>
                </div>
                {isError && <div className="error">{message}</div>}
                <div className='title'>Login</div>

                <div className="input-field">
                    <input type="text" className="input" value={username} placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
                    <i className='bx bx-user' ></i>
                </div>

                <div className="input-field">
                    <input type="Password" className="input" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                    <i className='bx bx-lock-alt'></i>
                </div>

                <div className="input-field">
                    <input type="submit" className="submit" value="Login" onClick={() => { dispatch(login({ username, password })) }} />
                </div>
            </div>
        </div>
    )
}
