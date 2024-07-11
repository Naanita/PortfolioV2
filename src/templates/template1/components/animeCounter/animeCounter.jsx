import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import CountUp from 'react-countup';

const AnimatedCounter = ({n}) => {
    const [hasStarted, setHasStarted] = useState(false);

    return (
        <VisibilitySensor onChange={(isVisible) => {
            if (isVisible && !hasStarted) {
                setHasStarted(true);
            }
        }}>
            {({ isVisible }) =>
                <CountUp start={hasStarted ? 0 : null} end={n} duration={1.75} />
            }
        </VisibilitySensor>
    );
};

export default AnimatedCounter;