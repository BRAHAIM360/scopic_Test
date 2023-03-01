import { Divider } from '@mui/material'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Header, TableItems } from '../../components'
import "./style.scss"


export const AdminPage = () => {
    return (
        <>
            <Header />
            <ToastContainer />
            <div className="admin-page">
                <h1>Admin Page</h1>
                <Divider sx={{ margin: '3% 5%' }} />
                <TableItems />
            </div>
        </>
    )
}
