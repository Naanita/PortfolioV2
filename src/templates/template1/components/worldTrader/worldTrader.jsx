import Timer1 from '../timer/timer1';
import { useEffect, useRef } from 'react';
import Particles2 from '../particles/particles2';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WorldTrader = () => {
    const mainRef = useRef(null);
    const titleref = useRef(null);
    const timerRef = useRef(null);
    const circleRef = useRef(null);

    useEffect(() => {
        const mainElement = mainRef.current;
        const titleElement = titleref.current;
        const timerElement = timerRef.current;
        const circleElement = circleRef.current;

        gsap.timeline({
            scrollTrigger: {
                trigger: mainElement,
                start: "top top",
                end: "100% top",
                pin: true,
                scrub: 2,
            }
        })
            .to(titleElement, {
                scale: 0,
                opacity: 0,
                duration: 1.5,
                ease: "power1.inOut"
            })
 
            .from(circleElement, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power1.inOut"
            }, "-=5") 
            
            .from(timerElement, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power1.inOut"
            }, "-=1");

    }, []);

    return (
        <div className="min-vh-100 bg-temp1-1  z-4 overflow-hidden pb-5" ref={mainRef} style={{ paddingTop: "16rem" }}>
            <div className='d-flex justify-content-center'>
                <span className='badgeTemp mb-4'>
                    <p className='text-white spaceNoWrap me-2'>June <span className='text-green'>FX</span>ology? Trading Competition</p>
                </span>
            </div>
            <div className="container text-center mb-4 position-relative" style={{ height: "300px" }}>
                <div className='position-absolute inset' ref={titleref} style={{scale:'1', opacity:"1"}}>
                    <h1 className="display-1 line-height-1 text-white m-0 text-center" style={{ paddingBottom: "3rem" }}>Traders from more tahn 150 <br /> countries around the world have registered!</h1>
                </div>
                <div className='position-absolute inset' ref={timerRef}>
                    <div className='position-absolute item-center'>
                        <p className="text-uppercase  text-white">Registration ends:</p>
                        <Timer1
                            dateMMDDYY='7/30/2024'
                        />
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='btn-table me-2'>Try for free</div>
                            <div className='btn-table me-2'>I want to join</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-relative" style={{ height: "60vh" }}>
                <Particles2 id='tdowet' />
                <div className="border-animatedRounded2 animated-true2 boxShadow1" ref={circleRef} style={{ height: '1800px', width: "132%", top: "20%", left: '50%', transform: "translateX(-50%)" }}>
                    <div className='blackspace position-absolute' style={{ background: "#070707", height: '99.5%' }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorldTrader;