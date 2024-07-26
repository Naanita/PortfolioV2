import React, { useState, useRef, useEffect } from 'react';
import CountUp from 'react-countup';

const AnimatedCounter = ({ n }) => {
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [hasStarted]);

    return (
        <span ref={ref}>
            <CountUp start={hasStarted ? 0 : null} end={n} duration={1.75} />
        </span>
    );
};

export default AnimatedCounter;