import React, { useState, useEffect } from 'react'
import { RootState, useAppSelector } from '../../store';
import "./style.scss"

interface CountDownProps {
    endofAuction: Date;
}

export const CountDown = ({ endofAuction }: CountDownProps) => {

    const [countDown, setCountDown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endofAuction.getTime() - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setCountDown({ days, hours, minutes, seconds })
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    const { darkTheme } = useAppSelector((state: RootState) => state.auth);

    return (
        <div id="countdown">
            <div className="number">
                <span >{String(countDown.days).padStart(2, '0')}</span>
                <span className="text" style={darkTheme ? { color: "white" } : {}}>Days</span>
            </div>
            <div className="number">
                <span >{String(countDown.hours).padStart(2, '0')}</span>
                <span className="text" style={darkTheme ? { color: "white" } : {}}>Hours</span>
            </div>
            <div className="number">
                <span >{String(countDown.minutes).padStart(2, '0')}</span>
                <span className="text" style={darkTheme ? { color: "white" } : {}}>Minutes</span>
            </div>
            <div className="number">
                <span >{String(countDown.seconds).padStart(2, '0')}</span>
                <span className="text" style={darkTheme ? { color: "white" } : {}}>Seconds</span>
            </div>
        </div>
    )
}