import React, { useState, useEffect } from 'react';

const Timer1 = ({ dateMMDDYY }) => {
    const [timeLeft, setTimeLeft] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const targetDate = new Date(dateMMDDYY);
            const difference = targetDate - now;

            if (difference < 0) {
                setMessage('Time has passed');
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                setMessage('Right now!');
            } else {
                setTimeLeft({
                    days: String(days).padStart(2, '0'),
                    hours: String(hours).padStart(2, '0'),
                    minutes: String(minutes).padStart(2, '0'),
                    seconds: String(seconds).padStart(2, '0')
                });
                setMessage('');
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [dateMMDDYY]);

    if (message) {
        return <div className="display-1 m-0 line-height-1 text-white">{message}</div>;
    }

    return (
        <div className="d-flex justify-content-center g-1 text-white text-center">
            <div className="d-flex me-3">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <h1 className="display-1 m-0 line-height-1">{timeLeft.days}</h1>
                    <p className="text-uppercase small">days</p>
                </div>
                <h1 className="display-1 m-0 line-height-1 ms-2">:</h1>
            </div>
            <div className="d-flex me-3">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <h1 className="display-1 m-0 line-height-1">{timeLeft.hours}</h1>
                    <p className="text-uppercase small">hours</p>
                </div>
                <h1 className="display-1 m-0 line-height-1 ms-2">:</h1>
            </div>
            <div className="d-flex me-3">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <h1 className="display-1 m-0 line-height-1">{timeLeft.minutes}</h1>
                    <p className="text-uppercase small">minutes</p>
                </div>
                <h1 className="display-1 m-0 line-height-1 ms-2">:</h1>
            </div>
            <div className="d-flex me-3">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <h1 className="display-1 m-0 line-height-1">{timeLeft.seconds}</h1>
                    <p className="text-uppercase small">seconds</p>
                </div>
            </div>
        </div>
    );
};

export default Timer1;