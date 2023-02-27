import React from 'react'
import { Header, TableItems } from '../../components'
import "./style.scss"


export const AdminPage = () => {
    return (
        <>
            <Header />
            <div className="admin-page">
                <h1>Admin Page</h1>

                <TableItems />
            </div>
        </>
    )
}
