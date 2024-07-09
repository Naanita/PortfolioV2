import './layout.css';
import { useEffect, useState, useMemo } from 'react';
import { loadFull } from "tsparticles";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import FollowUS from '../socialMedia/followUs.jsx';
import Navbar from '../navbar/navbar.jsx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Layout = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    const particlesLoaded = (container) => {
    };
    
    useEffect(() => {
        gsap.set(".glasgTemps-bg:not(.noAnipo)", { clipPath: "polygon(0 100%, 0 0, 0 0, 0 100%)", opacity: 0 });
        gsap.set('.bouncecale', { scale: 0.1, opacity: 0 })
        gsap.set('.greenLight', { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 })
        gsap.set('.circle-green', { scale: 1, opacity: 0 })
        const tl = gsap.timeline();

        // Primera secuencia de animaciones
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
            }, "-=1.5") // Esto hace que la animación comience al mismo tiempo que la anterior

            // Segunda secuencia de animaciones
            .to(".glasgTemps-bg:not(.noAnipo)", {
                clipPath: "polygon(0 100%, 0 0, 100% 0, 100% 100%)",
                duration: 1.5,
                opacity: 1,
                ease: "power3.inOut",
            })
            .to(".bouncecale", {
                scale: 1,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "back.out(1)",
            }, "-=1.5"); // Esto hace que la animación comience al mismo tiempo que la anterior
    }, []);
    
    const options = useMemo(() => (
        {
            fullScreen: {
                enable: false,
            },
            interactivity: {
                events: {
                    onClick: {
                        enable: false,
                    },
                    onHover: {
                        enable: false,
                    },
                    resize: true,
                },
                modes: {
                    bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 0.8,
                        size: 40,
                    },
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#edfff2",
                },
                collisions: {
                    enable: false,
                },
                move: {
                    enable: true,
                    random: false,
                    speed: 3,
                    straight: false,
                    direction: "top",
                    out_mode: "enter", 
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 600,
                },
                opacity: {
                    value: 1,
                },
                size: {
                    value: { min: 1, max: 3},
                },
                shape: {
                    type: "polygon", // Forma de las partículas: "circle", "edge", "triangle", "polygon", "star", "image"
                },
                shadow: {
                    enable: true,
                    blur: 10,
                    color: {
                        value: "#fff",
                    },
                }
            },
            detectRetina: true,
        }
    ))
    

    return (
        <div className='position-relative'>
        <Navbar />
        <div className="bg-temp1 position-relative min-vh-100 overflow-hidden d-flex justify-content-center align-items-center flex-column" style={{ perspective: '30rem' }} >
            <div className='w-100 h-100 position-absolute' style={{ transformStyle: "preserve-3d" }}>
                <div className='circle-transparent' style={{ transform: "translateX(70%)" }}></div>
                <div className='bg-horizontal-lines position-absolute' style={{ transform: "rotateY(70deg) translateX(-65rem) translateZ(-30rem)" }}></div>
                <div className='bg-horizontal-lines position-absolute' style={{ transform: "rotateY(-70deg) translateX(65rem) translateZ(-30rem)" }}></div>
                <div className='bg-horizontal-lines position-absolute w-50' style={{ transform: "translate(-50%, -50%) translateZ(-5.4rem)", top: "50%", left: "50%" }}></div>
                <div className='greenLight'></div>
                <div className='circle-green' style={{ transform: "0translateY(-70%)", top: "50%", left: "95%" }}></div>
                <div className='circle-green' style={{ transform: "translateY(0%)", top: "60%", left: "-15%" }}></div>
                <div className='position-absolute m-5 z-3' style={{ bottom: '0%', left: "0%"}}>
                    <FollowUS />
                </div>
                <div className='position-absolute m-5 z-3 bouncecale' style={{ bottom: '0%', right: "0%" }}>
                    <span className='m-0 text-white'><strong>Scroll</strong> to explore <i class="fa-solid fa-arrow-down text-green"></i></span>
                </div>
            </div>
            <div className='position-relative d-flex justify-content-center align-items-center flex-column w-100 h-100'>
                <div className='position-absolute overflow-hidden' style={{ width: "20%", height: "300px", top: "-20%", left: "20%", transform: "rotate(324deg)" }}>
                    {init && <Particles id="tsparticles1" className='h-100' particlesLoaded={particlesLoaded} options={options} />}
                </div>
                <div className='position-absolute overflow-hidden' style={{ width: "20%", height: "300px", bottom: "-20%", right: "20%", transform: "rotate(135deg)" }}>
                    {init && <Particles id="tsparticles2" className='h-100' particlesLoaded={particlesLoaded} options={options} />}
                </div>
                <div className='d-flex align-items-center flex-column position-relative z-3'>
                    <div className='d-flex align-items-center'>
                        <p className='text-white me-2 m-0 bouncecale'>Our Team</p>
                        <span className='badgeTemp bouncecale'><i className="fa-regular fa-star"></i>Success</span>
                    </div>
                    <h1 className='gradient-Text display-1Plus2 text-center line-height-1 py-3 w-xl-60'>No Time Limit Prop Firm Conquer the Market</h1>
                    <div className='d-flex flex-wrap justify-content-between align-items-center'>
                        <div className='badgeTempnoBg bouncecale'>
                            <i className="fa-regular fa-gem"></i>
                            <p className='title'>The lab™</p>
                            <p>Native platform</p>
                        </div>
                        <div className='badgeTempnoBg bouncecale'>
                            <i className="fa-regular fa-hand-peace"></i>
                            <p>Fast progress</p>
                        </div>
                        <div className='badgeTempnoBg bouncecale'>
                            <i className="fa-regular fa-message"></i>
                            <p>No time Limit Prop firm</p>
                        </div>
                        <div className='badgeTempnoBg bouncecale'>
                            <i className="fa-regular fa-circle"></i>
                            <p>Unique programs</p>
                        </div>
                    </div>
                    <div className='d-flex flex-wrap justify-content-between align-items-center mt-4'>
                            <div className='btn-exploreWhiGreen me-3 bouncecale'>
                            <p>Start a challenge</p>
                            <div className='icon'>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                            <div className='btn-outline-white bouncecale'>Free Trial</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
        
    }
export default Layout;