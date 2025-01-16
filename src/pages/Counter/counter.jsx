import React, { useState, useEffect } from 'react';

const Counter = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return;
        }

        const label = interval.charAt(0).toUpperCase();

        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {label}{" "}
            </span>
        );
    });

    return (
        
        <div className='container-fluid vh-100 vw-100 d-flex justify-content-center align-items-center bg-black flex-column'>
            <h1 className='display-4 text-white text-center'>
                ¿Cuanto tiempo tiene COS para pagar la tarjeta Pluxxe hoy 16 de Enero 2025? 
            </h1>
            <h3 className='text-white display-4 mt-5 text-center'>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            </h3>
        </div>
    );
};

export default Counter;