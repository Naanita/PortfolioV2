import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const HorizontalTextLeft = ({ text, container }) => {
    const containerSlideLeft = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const containerWidth = textRef.current.getBoundingClientRect().width;

        gsap.set(containerSlideLeft.current, { x: "50%" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "-10% center",
                end: "35% center",
                scrub: 1,
                onLeave: () => {
                    gsap.to(containerSlideLeft.current, {
                        x: `-${containerWidth - (containerWidth / 3)}px`,
                        duration: 5,
                        ease: "none",
                    });
                }
            }
        });

        tl.to(containerSlideLeft.current, {
            x: "-10%",
            duration: 16,
            ease: "none",
        });

        const texts = gsap.utils.toArray(".gradient-Text-radial");
        texts.forEach((text) => {
            const splitTitle = new SplitType(text, { type: "chars, words, lines" });
            gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top center",
                    end: "35% center",
                    scrub: 1,
                }
            }).from(splitTitle.chars, {
                opacity: 1,
                y: 650,
                x: 100,
                stagger: 0.05,
            });
        });

    }, [container]);

    return (
        <div className="d-flex" ref={containerSlideLeft}>
            <h1 className="gradient-Text-radial display-1Plus4 line-height-1 m-0 p-0 me-5 spaceNoWrap" ref={textRef}>
                {text}
            </h1>
        </div>
    );
};

export default HorizontalTextLeft;