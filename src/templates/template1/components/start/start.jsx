import { useState, useEffect, useRef } from 'react';
import cil from '../../assets/svg/cil.svg';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import money from '../../assets/svg/money.svg';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

gsap.registerPlugin(ScrollTrigger);



const Start = () => {
    const ball = useRef(null);
    const main = useRef(null);
    const title = useRef(null);
    const line = useRef(null);
    const entryHole = useRef(null);
    const exitHole = useRef(null);


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.set(ball.current, { top: "-30%", right: "3%", zIndex: 5 });
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: main.current,
                scrub: 3,
                start: "-20% 50%",
                end: "bottom 30%",
                onEnter: () => {
                    gsap.to(entryHole.current, { scale: 1 });
                },
                onLeave: () => {
                    gsap.to(entryHole.current, { scale: 0 });
                },
                onLeaveBack: () => {
                    gsap.to(entryHole.current, { scale: 0 });
                }
            }
        });
        tl.to(ball.current, {
            motionPath: {
                path: line.current,
                align: line.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: false
            },
            onUpdate: function () {
                let ballPosition = ball.current.getBoundingClientRect();
                let holePosition = entryHole.current.getBoundingClientRect();
                let ballCenterX = (ballPosition.left + ballPosition.right) / 2;
                let ballCenterY = (ballPosition.top + ballPosition.bottom) / 2;
                let holeCenterX = (holePosition.left + holePosition.right) / 2;
                let holeCenterY = (holePosition.top + holePosition.bottom) / 2;
                let distanceX = Math.abs(ballCenterX - holeCenterX);
                let distanceY = Math.abs(ballCenterY - holeCenterY);
                let threshold = 150;
                if (distanceX < threshold * 3 && distanceY < threshold * 3) {
                    gsap.to(entryHole.current, { scale: 1 });
                } else {
                    gsap.to(entryHole.current, { scale: 0 });
                }
            }
        })
        .to(ball.current, { rotateZ: 2000, ease: "none" }, 0);
    }, []);

    return (
        <>
            <div className="min-vh-100 bg-temp1-1 position-relative z-4 overflow-hidden py-5"  ref={main}>
                <div className="row px-5 g-4  position-relative h-100">
                    <div className="col-md-6 col-12 d-flex align-items-center">
                        <div className="w-xl-50">
                            <h1 className="text-white display-3 line-height-1" ref={title}>Stop losing your own money, join us and start earnig!</h1>
                            <div className='d-flex flex-wrap  align-items-center mt-4'>
                                <div className='btn-exploreWhiGreen me-3 bouncecale3'>
                                    <p>Join Us</p>
                                    <div className='icon'>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                </div>
                                <div className='btn-outline-white bouncecale3'>Free Trial</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 position-relative py-5 overflow-hidden" >
                        <div className='position-absolute' style={{ height: "auto", width: "14%" }} ref={ball}>
                            <img src={money} className='position-absolute item-center z-3 ' style={{height:"80px", width:"80px"}}>
                            </img>


                            <svg  width="100%" height="100%" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24.34" cy="24.34" r="24.34" fill="url(#paint0_linear_109_2)" filter="url(#noiseFilter)" />
                                <circle cx="24.34" cy="24.34" r="24.34" fill="url(#paint1_radial_109_2)" />
                                <defs>
                                    <linearGradient id="paint0_linear_109_2" x1="24.34" y1="0" x2="24.34" y2="48.68" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#DBFF00" />
                                        <stop offset="1" stopColor="#33FF00" />
                                    </linearGradient>
                                    <radialGradient id="paint1_radial_109_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.653 9.50653) rotate(146.162) scale(75.0538 102.693)">
                                        <stop stopColor="white" />
                                        <stop offset="0.293835" stopColor="white" stopOpacity="0.035" />
                                        <stop offset="0.727583" stopColor="white" stopOpacity="0" />
                                    </radialGradient>
                                    <filter id="noiseFilter">
                                        <feTurbulence type="fractalNoise" baseFrequency="10" numOctaves="1" result="turbulence" />
                                        <feComposite operator="in" in="turbulence" in2="SourceAlpha" result="composite" />
                                        <feColorMatrix in="composite" type="luminanceToAlpha" />
                                        <feBlend in="SourceGraphic" in2="composite" mode="color-burn" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        <div className='position-absolute entry-hole' style={{scale:"0", width:"210px", right:"0%", height:'30px', top:"-0.1%", borderRadius:"100%"}} ref={entryHole}></div>
                        <svg className='position-absolute' width="100%" height="100%" style={{scale:"1.3", top:"0%", left:"0%"}} viewBox="0 0 234 467" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path ref={line} d="M232.5 0.5C232.5 0.5 233 118 232.5 142.5C232 167 206 167 206 167H25C25 167 1.00003 167 1.00003 191C1.00003 215 1.00003 235 1.00003 258.5C1.00003 282 25 282 25 282C25 282 73.5 282 98.5 282C123.5 282 123.5 306.5 123.5 306.5L125.5 466.5"  />
                        </svg>
                        <img src={cil} className='h-auto w-100' alt=""/>
                    </div>
                    
                </div>
            </div>
        </>
    );
 };
export default Start;