import './blocks.css';
import React, { useEffect, useState, useRef, useCallback} from "react";
import AnimatedCounter from '../animeCounter/animeCounter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'split-text-js';

gsap.registerPlugin(ScrollTrigger);


const Blocks = () => {
    const blockContainer = useRef(null);
    const mainContainer = useRef(null);
    const greenCursorRef = useRef(null);    
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const titleRef = useRef(null);


    useEffect(() => {
        const handleMouseEnter = () => {
            gsap.to(greenCursorRef.current, { scale: 1, duration: 0.5, opacity: 1 });
        };

        const handleMouseLeave = () => {
            gsap.to(greenCursorRef.current, { scale: 0.1, duration: 0.5, opacity: 0 });
        };

        mainContainer.current.addEventListener('mouseenter', handleMouseEnter);
        mainContainer.current.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            mainContainer.current.removeEventListener('mouseenter', handleMouseEnter);
            mainContainer.current.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleMouseMove = useCallback((e) => {
        requestAnimationFrame(() => {
            const containerRect = mainContainer.current.getBoundingClientRect();
            setCursorPos({
                x: e.clientX - containerRect.left,
                y: e.clientY - containerRect.top
            });
        });
    }, []);

    useEffect(() => {
        gsap.set(greenCursorRef.current, { scale: 0.1, opacity: 0 });
        const blockSize = 200;
        const screenWidth = blockContainer.current.clientWidth;
        const screenHeight = blockContainer.current.clientHeight;
        const numCols = Math.ceil(screenWidth / blockSize);
        const numRows = Math.ceil(screenHeight / blockSize);
        const numBlocks = numCols * numRows;

        function createBlock() {
            for (let i = 0; i < numBlocks / 3; i++) { 
                const block = document.createElement('div');
                block.classList.add('blocksXL');
                block.dataset.index = i;
                blockContainer.current.appendChild(block);
            }
        }

const updateCursor = (e) => {
    // Utiliza requestAnimationFrame para optimizar las actualizaciones
    requestAnimationFrame(() => {
        const x = `${e.clientX}px`;
        const y = `${e.clientY}px`;
        document.documentElement.style.setProperty('--x', x);
        document.documentElement.style.setProperty('--y', y);
    });
};

document.body.addEventListener('pointermove', updateCursor);
createBlock();

return () => {
    document.body.removeEventListener('pointermove', updateCursor);
};
    }, []);


    useEffect(() => {
        const splitTitle = new SplitText(titleRef.current, { type: "chars, words, lines" });
        gsap.set('.bouncecale7', { scale: 0.1, opacity: 0 })


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainer.current,
                start: "-20% center",
                end: "20% center",
                scrub: 1,
            }
        });
                tl.from(splitTitle.chars, {
                    opacity: 0,
                    y: 80,
                    rotateX: 90,
                    stagger: .03,
                })
                    .to(".bouncecale7", {
                        scale: 1,
                        opacity: 1,
                        duration:2,
                        stagger: 0.2,
                        ease: "power4.out"
                    })
    }, []);
    return (
        <div className="bg-temp1 min-vh-100 position-relative z-3" ref={mainContainer} onMouseMove={handleMouseMove}>
            <div className="position-absolute h-100 w-100 overflow-hidden" >
                <div className="blocksContentShadow"></div>
                <div className="GreenFollowCursor" ref={greenCursorRef} style={{ left: cursorPos.x - 150, top: cursorPos.y - 100, zIndex: 1 }}></div>
                <div className="blocksContent" ref={blockContainer}></div>
            </div>
            <div className="position-relative z-2 container py-5">
                <div className="pt-5 w-xl-50 mx-auto">
                    <h1 className="text-white mb-3 text-center display-5 line-height-1" ref={titleRef}>Traders from more than 150 countries around the world have registered!</h1>
                    <p className="text-white-800-2 text-center bouncecale7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur cum quisquam harum, in illum dicta rem quod minus, natus aliquam suscipit omnis delectus maiores aspernatur impedit voluptatum, esse nisi quia distinctio accusamus numquam tenetur. Qui vel dicta assumenda facilis earum vitae id porro, molestias, natus ab neque accusantium dolores ipsum?</p>
                </div>
                <div className="row w-xl-75 mx-auto mt-6 mb-5 g-5 pb-5">
                    <div className="col-md-6 text-center">
                        <h1 className="text-white display-3 m-0">
                            $
                            <AnimatedCounter
                                n={400}
                            />
                            K
                            <span className="text-green">+</span>
                        </h1>
                        <p className="text-white fw-bolder m-0">Paid out to Fxology Traders</p>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-6"></div>
                    <div className="col-md-6 text-center">
                        <h1 className="text-white display-3 m-0">
                            <AnimatedCounter
                                n={15}
                            />
                            K
                            <span className="text-green">+</span>
                        </h1>
                        <p className="text-white fw-bolder m-0">No of Fxology traders</p>
                    </div>
                    <div className="col-md-6 text-center">
                        <h1 className="text-white display-3 m-0">
                            <AnimatedCounter
                                n={150}
                            />
                            <span className="text-green">+</span>
                        </h1>
                        <p className="text-white fw-bolder m-0 w-50 mx-auto">No. of countries with traders registered at Fxology</p>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-6"></div>
                    <div className="col-md-6 text-center">
                        <h1 className="text-white display-3 m-0">
                            <AnimatedCounter
                                n={16}
                            />
                            <span className="text-green">h</span>
                        </h1>
                        <p className="text-white fw-bolder m-0">Avg payout processing time</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blocks;