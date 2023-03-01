import React from 'react'
import "./style.scss"

interface NotificationMessageProps {
    message: string;
    date: string;
}

export const NotificationMessage = ({ message, date }: NotificationMessageProps) => {
    return (
        <div className="notification-message">
            <p>{message}</p>
            <span>{`${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`}</span>
        </div>

    )
}