import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from 'split-text-js';


gsap.registerPlugin(ScrollTrigger);

const HorizontalTextLeft = ({ text, container }) => {
    const textRef = useRef(null);  
    const containerSlideLeft = useRef(null);
    useEffect(() => {

        const splitTitle = new SplitText(textRef.current, { type: "chars, words, lines" });
        gsap.set(containerSlideLeft.current, { x: "50%" })
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top center",
                end: "bottom center",
                scrub: 1,
                markers: true,
                onLeave: () => {
                    console.log("onLeave");
                },
            }
        });
        
        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top center",
                end: "center center",
                scrub: 1,
                markers: true,
                onLeave: () => {
                    console.log("onLeave");
                },
            }
        });

        tl.to(containerSlideLeft.current, {
            x: "-100%",
            duration: 2,
            ease: "none",
        })
        tl2.from(splitTitle.chars, {
            opacity: 1,
            y: 600,
            x: 50,
            stagger: .05,
        })



    }, []);

    return (
        <div className="bg-danger w-100" ref={containerSlideLeft}>
            <h1 className="text-white display-1Plus4 line-height-1 m-0 p-0" ref={textRef} style={{whiteSpace: "nowrap" }}>
                {text}
            </h1>
        </div>
    );
};

export default HorizontalTextLeft;