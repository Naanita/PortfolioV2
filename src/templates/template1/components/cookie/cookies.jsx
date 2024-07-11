import React, { useState } from 'react';
import './cookies.css';

const Cookies = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleButtonClick = () => {
        setIsVisible(false); 
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="glasgTemps-bg border border-secondary container noAnipo bouncecale6">
            <div className='p-1'>
                <div className="row">
                    <div className="col-md-9 col-sm-12">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="iconCokie border border-secondary me-2">
                                <i className="fa-solid fa-cookie-bite"></i>
                            </div>
                            <p className="m-0 text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit facere, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit facere.</p>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <div className="d-flex justify-content-center align-items-center">
                            <button className="btn-outline-white me-2" onClick={handleButtonClick}>Decline</button>
                            <button className="btn btn-white bg-dark-hover" style={{ height: '3rem' }} onClick={handleButtonClick}>Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cookies;