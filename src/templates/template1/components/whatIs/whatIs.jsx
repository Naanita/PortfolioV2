import { useRef, useEffect, useState } from 'react';
import HorizontalTextLeft from '../../components/horizontalText/horizontalTextLeft.jsx';

const WhatIs = () => {
    const mainContainer = useRef(null);
    const [container, setContainer] = useState(null);

    useEffect(() => {
        setContainer(mainContainer.current);
    }, []);

    return (
        <div className="min-vh-100 bg-temp1-1 position-relative z-4 overflow-hidden" ref={mainContainer}>
            <div>
            {container && <HorizontalTextLeft
                text="esternocleidooccipitomastoideo"
                container={container}
            />}
            </div>
        </div>
    );
}
export default WhatIs;