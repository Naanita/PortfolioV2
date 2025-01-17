import React, { useState, useEffect } from 'react';

const Counter = ({ targetDate }) => {
    const calculateTimeElapsed = () => {
        const difference = +new Date() - +new Date(targetDate);
        let timeElapsed = {};

        if (difference > 0) {
            timeElapsed = {
                hours: Math.floor(difference / (1000 * 60 * 60)),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeElapsed;
    };

    const [timeElapsed, setTimeElapsed] = useState(calculateTimeElapsed());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeElapsed(calculateTimeElapsed());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeElapsed).forEach((interval) => {
        if (!timeElapsed[interval] && timeElapsed[interval] !== 0) {
            return;
        }

        const label = interval.charAt(0).toUpperCase();

        timerComponents.push(
            <span key={interval}>
                {timeElapsed[interval]} {label}{" "}
            </span>
        );
    });

    return (
        <div className='container-fluid vh-100 vw-100 d-flex justify-content-center align-items-center bg-black flex-column'>
            <h1 className='display-4 text-white text-center'>
                Tiempo transcurrido desde que COS no ha pagado la Pluxxe
            </h1>
            <h3 className='text-white display-4 mt-5 text-center'>
                {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            </h3>
        </div>
    );
};
 
export default Counter;