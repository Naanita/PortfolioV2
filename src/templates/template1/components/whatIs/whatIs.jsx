import { useRef, useEffect, useState } from 'react';
import HorizontalTextLeft from '../../components/horizontalText/horizontalTextLeft.jsx';
import Particles1 from '../particles/particles1.jsx';
import InfiniteRight from '../infiniteRight/infiniteRight.jsx';
import InfiniteLeft from '../infiniteLeft/infiniteLeft.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SplitType from 'split-type';


gsap.registerPlugin(ScrollTrigger);


const WhatIs = () => {
    const mainContainer = useRef(null);
    const titleref = useRef(null);
    const descriptionref = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
    const badge = useRef(null);
    const [container, setContainer] = useState(null);

    useEffect(() => {
        setContainer(mainContainer.current);
    }, []);

    const Coins = [
        {
            name: "Bitcoin",
            symbol: "BTC",
            currentPrice: '62699 USD',
            image: "https://www.cryptocompare.com/media/19633/btc.png",
            upordown: "-1%",
        },
        {
            name: "Ethereum",
            symbol: "ETH",
            currentPrice: '62699 USD',
            image: "https://www.cryptocompare.com/media/20646/eth_logo.png",
            upordown: "+25%",
        },
        {
            name: "Litecoin",
            symbol: "LTC",
            currentPrice: '62699 USD',
            image: "https://www.cryptocompare.com/media/35309662/ltc.png",
            upordown: "+0.002%",
        },
        {
            name: "solana",
            symbol: "SOL",
            currentPrice: '62699 USD',
            image: "https://www.cryptocompare.com/media/37747734/sol.png",
            upordown: "-0.0021%",
        },
        {
            name: "Cardano",
            symbol: "ADA",
            currentPrice: '62699 USD',
            image: "https://www.cryptocompare.com/media/12318177/ada.png",
            upordown: "+16.2156%",
        },
        {
            name: "Polkadot",
            symbol: "DOT",
            currentPrice: '62699 USD',
            image: "https://resources.cryptocompare.com/asset-management/20/1662461067977.png?width=200",
            upordown: "+12.5%",
        },
        {
            name: "Dogecoin",
            symbol: "DOGE",
            currentPrice: '62699 USD',
            image: "https://resources.cryptocompare.com/asset-management/26/1662541306654.png?width=200",
            upordown: "-52%",
        },
        {
            name: "Ripple",
            symbol: "XRP",
            currentPrice: '62699 USD',
            image: "https://www.cryptocompare.com/media/34477776/xrp.png",
            upordown: "+14.5%",
        },
        {
            name: "Pepe",
            symbol: "PEPE",
            currentPrice: '62699 USD',
            image: "https://resources.cryptocompare.com/asset-management/3010/1709049889749.png?width=200",
            upordown: "+2%",
        }
    ]    

    useEffect(() => {
        const splitTitle1 = new SplitType(titleref.current, { type: "chars, words, lines" });
        const splitTitle2 = new SplitType(descriptionref.current, { type: "chars, words, lines" });
        gsap.set(textRef1.current, { x: "100%", opacity: 0 });
        gsap.set(textRef2.current, { x: "-100%", opacity: 0 });
        gsap.set(badge.current, { scale: 0, opacity: 0 });
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainer.current,
                start: "35% center",
                end: "60% center",
                scrub: 1,
            }
        });
        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainer.current,
                start: "35% center",
                end: "90% center",
                scrub: 1,
            }
        });

        tl2.from(splitTitle2.lines, {
            opacity: 0,
            y: 80,
            stagger: .03,
        },)

        tl.from(splitTitle1.chars, {
            opacity: 0,
            y: 80,
            rotateX: 90,
            stagger: .03,
        })
        .to([textRef1.current, textRef2.current], { x: "0%", opacity: 1, duration:5, ease: "none" }, '<')
        .to(badge.current, { scale: 1, opacity: 1, duration: 5, ease: "none" }, '<');
        
    }, []);



    return (
        <div className="min-vh-100 bg-temp1-1 position-relative z-4 overflow-hidden py-5" ref={mainContainer}>
            <div style={{marginBottom:"15rem"}}>
                {container && <HorizontalTextLeft
                    text="Swap-free for 28 pairs and all metals!"
                    container={container}
                />}
            </div>
            <div className='container my-5'>
                <div className='row g-5 py-5'>
                    <div className='col-12 col-md-6 position-relative d-flex align-items-center justify-content-center' style={{minHeight:"50vh"}}>
                        <div className='position-absolute inset'>
                            <div className='position-absolute circle-green item-center'></div>
                            <div className='position-absolute item-center overflow-hidden' style={{ width: "80%", height: "100%", borderRadius:'50%'}}>
                                <Particles1 id="3" />
                            </div>
                            <div className='position-absolute  h-100 w-100'>
                                <div class="spinner2 position-absolute"><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-center w-100 flex-column  position-relative z-1'>
                            <h1 className='display-1 text-white me-auto line-height-1' ref={textRef1}>Our Capital</h1>
                            <h1 className='display-1 text-white ms-auto line-height-1' ref={textRef2}>Your Success</h1>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 position-relative d-flex align-items-start justify-content-center flex-column'>
                            <span className='badgeTemp mb-4' ref={badge}>
                                <p className='text-white spaceNoWrap me-2'>What is <span className='text-green'>FX</span>ology?</p>
                            </span>
                            <div className='text-white w-100'>
                            <h1 className='line-height-1 mb-4' ref={titleref}>Trade on Forex and other markets with capital yp to 640,00 USD!</h1>
                                <div>
                                <p className='small' ref={descriptionref}>Swap-free is a service that is available for traders who are unable to use the swap account type. This service is available for 28 pairs and all metals. The swap-free service is not available for CFDs and cryptocurrencies. Swap-free accounts are not available for all account types. Please see the account types that are available for swap-free service. 
                                    <br />
                                    <br />
                                    Swap-free is a service that is available for traders who are unable to use the swap account type. This service is available for 28 pairs and all metals. The swap-free service is not available for CFDs and cryptocurrencies. Swap-free accounts are not available for all account types. Please see the account types that are available for swap-free service.
                                </p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
                <div className='mx-auto mb-5' style={{marginTop:"8rem", width:"85vw"}}>
                    <InfiniteRight>
                        {Coins.map((coin, index) => (
                            <span className='badgeTemp justify-content-center align-items-center' key={index}>
                                <img src={coin.image} alt={coin.name} />
                                <p className='text-white spaceNoWrap me-2'>{coin.symbol}</p>
                                <p className='text-white-800-3 spaceNoWrap me-2'>{coin.currentPrice}</p>
                                <p className={`spaceNoWrap  text-${coin.upordown.startsWith('-') ? 'red' : 'green'}`}>{coin.upordown}</p>
                            </span>
                            ))}
                    </InfiniteRight>
                    <InfiniteLeft>
                        {Coins.map((coin, index) => (
                            <span className='badgeTemp justify-content-center align-items-center' key={index}>
                                <img src={coin.image} alt={coin.name} />
                                <p className='text-white spaceNoWrap me-2'>{coin.symbol}</p>
                                <p className='text-white-800-3 spaceNoWrap me-2'>{coin.currentPrice}</p>
                                <p className={`spaceNoWrap  text-${coin.upordown.startsWith('-') ? 'red' : 'green'}`}>{coin.upordown}</p>
                            </span>
                        ))}
                    </InfiniteLeft>
                </div>
        </div>
    );
}
export default WhatIs;