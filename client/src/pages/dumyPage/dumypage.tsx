import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { login, logout } from '../../store/auth/authSlice';
import { useGetItemsQuery } from '../../store/itemApi'


export const Dumy = ({ text }: { text: string }) => {

    const { isLogged, isLoading, isError, isLoginSuccess, message } = useAppSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { data: items } = useGetItemsQuery("");
    useEffect(() => {

        console.log(items)
    }, [items])

    useEffect(() => {
        console.log(isLogged)
    }, [isLogged])
    return (
        <div>
            {isLogged ? <button onClick={() => dispatch(logout())}>Login</button> :
                <div>
                    {isError && <h1>{message}</h1>}
                    <input type="text" name='username' onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={() => dispatch(login({ username, password }))}>Login</button>
                </div>
            }
        </div>
    )
}