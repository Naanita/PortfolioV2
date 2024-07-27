import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './how.css';

gsap.registerPlugin(ScrollTrigger);


const HowWork = () => {
    const main = useRef(null);
    const lightRef = useRef(null);

    useEffect(() => {
        const steps = document.querySelectorAll('[data-content-step]');
        const images = document.querySelectorAll('[data-image-step]');
        const progressBars = document.querySelectorAll('.progress-bar');
        const stepPickers = document.querySelectorAll('[data-pick-step]');
        let currentStep = 0;
        let whereAreValue = { position: "41%" };
        let interval; // Mover la declaración de interval aquí

        const animateStep = (index) => {
            gsap.killTweensOf(progressBars);
            gsap.to(steps, { opacity: 0, duration: 1 });
            gsap.to(images, { opacity: 0, duration: 1 });

            const gradientAngle = index === 1 ? "0deg" : index === 2 ? "-20deg" : "20deg";
            const newWhereAre = index === 1 ? "41%" : index === 2 ? "80%" : "0%";
            const gradient = `border-box linear-gradient(${gradientAngle}, #a6ff00 0%, #131313 20%)`;

            gsap.to(whereAreValue, {
                position: newWhereAre,
                duration: 1,
                onUpdate: () => {
                    lightRef.current.style.left = whereAreValue.position;
                }
            });

            gsap.to(images, { background: gradient, duration: 1 });

            gsap.set(progressBars, { width: '0%', opacity: 0 });
            gsap.to(progressBars[index], {
                width: '100%', opacity: 1, duration: 5, ease: 'linear',
            });

            gsap.to(steps[index], { opacity: 1, duration: 1 });
            gsap.to(images[index], { opacity: 1, duration: 1, x: 0 });

            const title = steps[index].querySelector('[data-title-step]');
            const description = steps[index].querySelector('[data-descrip-step]');
            const splitTitle = new SplitType(title, { type: "chars, words, lines" });
            const splitDescrip = new SplitType(description, { type: "chars, words, lines" });
            gsap.from(splitTitle.chars, {
                opacity: 0,
                y: 80,
                rotateX: 90,
                stagger: .03,
                duration: 1,
            })
            gsap.from(splitDescrip.lines, {
                opacity: 0,
                y: 80,
                stagger: .03,
                duration: 1,
            })
            stepPickers.forEach((picker, idx) => {
                picker.classList.remove('active');
                if (idx === index) {
                    picker.classList.add('active');
                }
            });
        };

        const initSlider = () => {
            stepPickers.forEach((picker, index) => {
                picker.addEventListener('click', () => {
                    clearInterval(interval);
                    currentStep = index;
                    animateStep(currentStep);
                });
            });

            const nextStep = () => {
                currentStep = (currentStep + 1) % steps.length;
                animateStep(currentStep);
            };
            animateStep(currentStep);
            interval = setInterval(nextStep, 6000); 
            return () => clearInterval(interval);
        };

        gsap.to({}, {
            scrollTrigger: {
                trigger: main.current,
                start: "top center",
                end: "bottom top",
                toggleActions: "play none none reverse",
                onEnter: initSlider,
                onLeave: () => clearInterval(interval), 
            }
        });
    }, []);
    
    return (
        <div className="min-vh-100 bg-temp1-1 position-relative z-4 pb-5 overflow-hidden" ref={main}>
            <div className='blocksDiv' style={{ height: "30vh", width: "60vw", left:"50%", transform:"translateX(-50%)" }}>
                <div className='blocksContentShadow'></div>
            </div>
            <div className="container">
                <h1 className="display-1 line-height-1 text-white m-0 text-center" style={{ paddingTop: "3rem" }}> how does it works?</h1>
                <p className="fs-5 text-white-800-2 text-center">Your pathway to professional trading</p>
                <div className="row w-100 mt-4 g-4 position-relative">
                    <div className='circle-yellow position-absolute z-n1' ref={lightRef} style={{width:"200px", height:"500px", top:"15%"}}></div>
                    <div className="col-12">
                        <div className='position-relative' style={{ height: "40vh" }}>
                            <div className=" cardGradientBorder" data-image-step='1'>
                                <div className="card-img">
                                    <img src="https://images.pexels.com/photos/192136/pexels-photo-192136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="placeholder" className="img-fluid w-100 h-100 object-fit-cover"/>
                                </div>
                            </div>
                            <div className="cardGradientBorder" data-image-step='2'>
                                <div className="card-img">
                                    <img src="https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="placeholder" className="img-fluid w-100 h-100 object-fit-cover" />
                                </div>
                            </div>
                            <div className="cardGradientBorder" data-image-step='3'>
                                <div className="card-img">
                                    <img src="https://images.pexels.com/photos/1048033/pexels-photo-1048033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="placeholder" className="img-fluid w-100 h-100 object-fit-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card bg-transparent border-0">
                            <div className="card-body">
                                <div class="progress mb-4" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ height: "1px" }}>
                                    <div class="progress-bar bg-green" data-progress-step="1" style={{ width: "0%", opacity:"0%" }}></div>
                                </div>
                                <h6 className="step text-white-800-2 text-uppercase mb-4 cursor-pointer" data-pick-step='1' style={{ letterSpacing: "0.5rem" }}>STEP 1</h6>
                                <div data-content-step='1'>
                                    <div className='h-auto overflow-hidden'>
                                        <h2 className="text-white" data-title-step='1'>Choose A Program</h2>
                                    </div>
                                    <p className="text-white-800-2" data-descrip-step='1'>We provide you with the best training phases to help you learn the basics of trading.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card bg-transparent border-0">
                            <div className="card-body">
                                <div class="progress mb-4" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ height: "1px" }}>
                                    <div class="progress-bar bg-green" data-progress-step="2" style={{ width: "0%", opacity:"0%" }}></div>
                                </div>
                                <h6 className="step text-white-800-2 text-uppercase mb-4 cursor-pointer" data-pick-step='2' style={{ letterSpacing: "0.5rem" }}>STEP 2</h6>
                                <div data-content-step='2'>
                                    <div className='h-auto overflow-hidden'>
                                        <h2 className="text-white" data-title-step='2'>Step 2: Training phases</h2>
                                    </div>
                                    <p className="text-white-800-2" data-descrip-step='2'>We provide you with the best training phases to help you learn the basics of trading.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card bg-transparent border-0">
                            <div className="card-body">
                                <div class="progress mb-4" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ height: "1px" }}>
                                    <div class="progress-bar bg-green" data-progress-step="3" style={{ width: "0%", opacity:"0%" }}></div>
                                </div>
                                <h6 className="step text-white-800-2 text-uppercase mb-4 cursor-pointer" data-pick-step='3' style={{ letterSpacing: "0.5rem" }}>STEP 3</h6>
                                <div data-content-step='3'>
                                    <div className='h-auto overflow-hidden'>
                                        <h2 className="text-white" data-title-step='3'>Step 3: Co--operation</h2>
                                    </div>
                                    <p className="text-white-800-2" data-descrip-step='3'>We provide you with the best training phases to help you learn the basics of trading.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
 }
export default HowWork;