import './layout.css';
import { useEffect, useState, useMemo, useRef } from 'react';
import FollowUS from '../socialMedia/followUs.jsx';
import Cookies from '../cookie/cookies.jsx';
import Navbar from '../navbar/navbar.jsx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'split-text-js';
import Particles1 from '../particles/particles1.jsx';

gsap.registerPlugin(ScrollTrigger);


const Layout = () => {
    const titleRef = useRef(null);
    
    useEffect(() => {
        gsap.set(".glasgTemps-bg:not(.noAnipo)", { clipPath: "polygon(0 100%, 0 0, 0 0, 0 100%)", opacity: 0 });
        gsap.set('.bouncecale', { scale: 0.1, opacity: 0 })
        gsap.set('.bouncecale1', { scale: 0.1, opacity: 0 })
        gsap.set('.bouncecale2', { scale: 0.1, opacity: 0 })
        gsap.set('.bouncecale3', { scale: 0.1, opacity: 0 })
        gsap.set('.bouncecale4', { scale: 0.1, opacity: 0 })
        gsap.set('.bouncecale5', { scale: 0.1, opacity: 0 })
        gsap.set('.bouncecale6', { scale: 0.1, opacity: 0 })
        gsap.set('.zommpartani', { scale: 0.1, opacity: 0})
        gsap.set('.greenLight', { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 })
        gsap.set('.circle-green', { scale: 1, opacity: 0 })
        const splitTitle = new SplitText(titleRef.current, { type: "chars, words, lines" });
        const tl = gsap.timeline();
        // (1)
        tl.to(".greenLight", {
            clipPath: "polygon(0 0, 100% 0, 100% 1000%, 0 100%)",
            duration: 1.5,
            opacity: 1,
            ease: "power3.inOut",
        })
        .to(".circle-green", {
            scale: 1,
            duration: 1.5,
            opacity: 1,
            ease: "power3.inOut",
        }, "-=1.5")
        // (2)
        .to(".glasgTemps-bg:not(.noAnipo)", {
            clipPath: "polygon(0 100%, 0 0, 100% 0, 100% 100%)",
            duration: 1.5,
            opacity: 1,
            ease: "power3.inOut",
        })
        .from(splitTitle.chars, {
            opacity: 0,
            y: 80,
            rotateX: 90,
            stagger: .03,
        },"-=1.5")
        .to(".bouncecale", {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1)",
        }, "-=1.5")
        .to(".bouncecale1", {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1)",
        }, "-=1.5")
        .to(".bouncecale2", {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1)",
        }, "-=1.5")
        .to(".bouncecale3", {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1)",
        }, "-=1.5")
        .to(".bouncecale4", {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1)",
        }, "-=1.5")
        .to(".bouncecale5", {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1)",
        }, "-=1.5")
        .to(".bouncecale6", {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1)",
        }, "-=1.5")
        .to(".zommpartani", {
            scale: 1,
            duration: 1,
            opacity: 1,
            ease: "back.out(1)",
        }, "-=1.5")
        
    }, []);
    
    return (
        <div className='position-sticky top-0'>
            <Navbar />
            <div className='w-xl-50 position-absolute bottom-0 start-50 z-3 mb-3' style={{transform:"translateX(-50%)"}}>
                <Cookies />
            </div>
            <div className="bg-temp1  min-vh-100 overflow-hidden d-flex justify-content-center align-items-center flex-column" style={{ perspective: '30rem' }} >
                <div className='w-100 h-100 position-absolute' style={{ transformStyle: "preserve-3d" }}>
                    <div className='circle-transparent' style={{ transform: "translateX(70%)" }}></div>
                    <div className='bg-horizontal-lines position-absolute' style={{ transform: "rotateY(70deg) translateX(-65rem) translateZ(-30rem)" }}></div>
                    <div className='bg-horizontal-lines position-absolute' style={{ transform: "rotateY(-70deg) translateX(65rem) translateZ(-30rem)" }}></div>
                    <div className='bg-horizontal-lines position-absolute w-50' style={{ transform: "translate(-50%, -50%) translateZ(-5.4rem)", top: "50%", left: "50%" }}></div>
                    <div className='greenLight'></div>
                    <div className='circle-green' style={{ transform: "0translateY(-70%)", top: "50%", left: "95%" }}></div>
                    <div className='circle-green' style={{ transform: "translateY(0%)", top: "60%", left: "-15%" }}></div>
                    <div className='position-absolute m-5 z-3' style={{ bottom: '0%', left: "0%" }}>
                        <FollowUS />
                    </div>
                    <div className='position-absolute m-5 z-3 bouncecale5' style={{ bottom: '0%', right: "0%" }}>
                        <span className='m-0 text-white'><strong>Scroll</strong> to explore <i class="fa-solid fa-arrow-down text-green"></i></span>
                    </div>
                </div>
                <div className='position-relative d-flex justify-content-center align-items-center flex-column w-100 h-100'>
                    <div className='position-absolute overflow-hidden particles zommpartani' style={{ width: "20%", height: "300px", top: "-20%", left: "20%", transform: "rotate(324deg)" }}>
                        <Particles1 id="tsparticles1" />
                    </div>
                    <div className='position-absolute overflow-hidden particles zommpartani' style={{ width: "20%", height: "300px", bottom: "-20%", right: "20%", transform: "rotate(135deg)" }}>
                        <Particles1 id="tsparticles2" />
                    </div>
                    <div className='d-flex align-items-center flex-column position-relative z-3'>
                        <div className='d-flex align-items-center'>
                            <p className='text-white me-2 m-0 bouncecale1'>Our Team</p>
                            <span className='badgeTemp bouncecale1'><i className="fa-regular fa-star"></i>Success</span>
                        </div>
                        <h1 className='display-1Plus2 w-xl-60 line-height-1 py-3 gradient-Text text-center' ref={titleRef}>No Time Limit Prop Firm Conquer the Market</h1>
                        <div className='d-flex flex-wrap justify-content-between align-items-center'>
                            <div className='badgeTempnoBg bouncecale2'>
                                <i className="fa-regular fa-gem"></i>
                                <p className='title'>The lab™</p>
                                <p>Native platform</p>
                            </div>
                            <div className='badgeTempnoBg bouncecale2'>
                                <i className="fa-regular fa-hand-peace"></i>
                                <p>Fast progress</p>
                            </div>
                            <div className='badgeTempnoBg bouncecale2'>
                                <i className="fa-regular fa-message"></i>
                                <p>No time Limit Prop firm</p>
                            </div>
                            <div className='badgeTempnoBg bouncecale2'>
                                <i className="fa-regular fa-circle"></i>
                                <p>Unique programs</p>
                            </div>
                        </div>
                        <div className='d-flex flex-wrap justify-content-between align-items-center mt-4'>
                            <div className='btn-exploreWhiGreen me-3 bouncecale3'>
                                <p>Start a challenge</p>
                                <div className='icon'>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </div>
                            </div>
                            <div className='btn-outline-white bouncecale3'>Free Trial</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Layout;