import './line.css';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => { 
    const mainContainer = useRef(null);
    const text2009 = useRef(null);
    const text2011 = useRef(null);
    const text2015 = useRef(null);
    const textPresent = useRef(null);
    const line2009 = useRef(null);
    const line2011 = useRef(null);
    const line2015 = useRef(null);
    const linePresent = useRef(null);
    const finalText = useRef(null);

    useEffect(() => {
        
        gsap.set([text2009.current, text2011.current, text2015.current, textPresent.current], { opacity: 0, display: "block" });
        gsap.set([textPresent.current, finalText.current], { display: "none", opacity: 0, y: 100 });
        gsap.set([line2009.current, line2011.current, line2015.current, linePresent.current], { height: "0px", opacity: 0 });

        gsap.timeline({
            scrollTrigger: {
                trigger: mainContainer.current,
                start: "top top",
                end: "450% top",
                pin: true,
                scrub: 2,
            }
        })
            .to(text2009.current, {
                opacity: 1,
                duration: 1,
                ease: "power1.inOut"
            })
            .to(line2009.current, {
                height: "80px",
                opacity: 1,
                duration: 1,
                ease: "power1.inOut"
            }, '<')


            .to(text2011.current, {
                opacity: 1,
                duration: 1,
                ease: "power1.inOut"
            })
            .to(line2011.current, {
                height: "160px",
                opacity: 1,
                duration: 1,
                ease: "power1.inOut"
            }, '<')
            .to(text2009.current, {
                opacity: 0.1,
                duration: 1,
                ease: "power1.inOut"
            }, '<')


            .to(text2015.current, {
                opacity: 1,
                duration: 1,
                ease: "power1.inOut"
            })
            .to(line2015.current, {
                height: "240px",
                opacity: 1,
                duration: 1,
                ease: "power1.inOut"
            }, '<')
            .to(text2011.current, {
                opacity: 0.1,
                duration: 1,
                ease: "power1.inOut"
            }, '<')


            .to(textPresent.current, {
                opacity: 1,
                duration: 1,
                y: 0,
                display: "block",
                ease: "power1.inOut"
            })
            .to(linePresent.current, {
                height: "340px",
                opacity: 1,
                duration: 1,
                ease: "power1.inOut"
            }, '<')
            .to([text2009.current, text2011.current, text2015.current], {
                opacity: 0.1,
                display: "none",
                duration: 0,
                ease: "power1.inOut"
            }, '-=1')
            .to(finalText.current, {
                opacity: 1,
                duration: 1,
                y: 0,
                display: "block",
                ease: "power1.inOut"
            })
            .to(textPresent.current, {
                opacity: 0.1,
                duration: 0,
                y: 100,
                display: "none",
                ease: "power1.inOut"
            }, '-=1')
    }, []);


    return (
        <div className='min-vh-100 z-4 pb-4' ref={mainContainer}  style={{ background: "#070707" }}>
            <div className="container-fluid px-xl-6">
                <div className='d-flex w-50 justify-content-center w-100' >
                    <h1 className='text-center line-height-1 text-white mb-5 w-xl-50 display-2' >
                        Our client have the potential to vecome a profitable tadre in a <span className='text-green'>relatively short time</span>
                    </h1>
                </div>
                <div className="row" >
                    <div className="col-5 d-flex justify-content-between align-items-center flex-column g-4 position-relative">
                            <h2 className='text-white' ref={text2015}>
                                <span className='text-green'>in 2015 </span> we began to offering clients training courses. Thousands of satisfied clients have already passed or courses.
                            </h2>
                            <h2 className='text-white' ref={text2011}>
                                We have been devoted to full time trading <span className='text-green'>since 2011</span>, gaining lots of experience, which we decided to offer to a wider number of people.
                            </h2>
                            <h2 className='text-white' ref={text2009}>
                                We started trading on financial markets more than <span className='text-green'>15 year ago</span>.
                            </h2>
                            <p className='fs-5 text-white' ref={textPresent}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex enim necessitatibus, aperiam sit tenetur dignissimos molestiae rerum deleniti odio harum eaque laboriosam? Suscipit itaque voluptas, laboriosam expedita tempora ducimus qui doloribus, rem incidunt eius cupiditate excepturi esse nostrum. Quasi aperiam dicta distinctio odio. Quam labore veniam, et illum culpa magni!</p>
                            <div className='position-absolute bottom-0' ref={finalText}>
                                <h2 className='text-white'>
                                    Our clients have the potential to become a profitable trader im a relatively short time thanks to minimal initial costs, <span className='text-green'>widhout the fear of  losing their own capital</span>.
                                </h2>
                            <button className='btn-outline-white'>More about us</button>
                            </div>
                        </div>    
                    <div className="col-7  overflow-hidden" style={{ perspective: '30rem', height:"614px" }}>
                        <div className="w-100 h-100 position-relative" style={{transformStyle:"preserve-3d"}}>
                            <div className="z-1 w-100 h-100 position-absolute item-center" style={{ transform: "translatez(-29rem) translate(-50%, -50%)" }}>
                                <div className="blocksDivWhite border">
                                </div>
                            </div>
                            <div></div>
                            <div className="w-100 h-100 position-absolute item-center" style={{ transform: "translateZ(-39rem) rotateX(-85deg) translate(-50%, -50%)" }}>
                                <div className="blocksDivWhite border"></div>
                            </div>
                            <div className="w-100 h-100" style={{ transform:"translateZ(-1rem)"}}>
                                <div className="row g-1 position-absolute w-100 justify-content-center align-items-center bottom-0">
                                    <div className="col-3 d-flex flex-column align-items-center justify-content-center">
                                        <div className='w-100 position-relative' style={{height:"500px"}}>
                                            <div className='lineTimes' ref={line2009}></div>
                                        </div>
                                        <h3 className='mt-4 text-white'>2009</h3>
                                    </div>
                                    <div className="col-3 d-flex flex-column align-items-center justify-content-center">
                                        <div className='w-100 position-relative' style={{height:"500px"}}>
                                            <div className='lineTimes' ref={line2011}></div>
                                        </div>
                                        <h3 className='mt-4 text-white'>2011</h3>
                                    </div>
                                    <div className="col-3 d-flex flex-column align-items-center justify-content-center">
                                        <div className='w-100 position-relative' style={{height:"500px"}}>
                                            <div className='lineTimes' ref={line2015}></div>
                                        </div>
                                        <h3 className='mt-4 text-white'>2015</h3>
                                    </div>
                                    <div className="col-3 d-flex flex-column align-items-center justify-content-center">
                                        <div className='w-100 position-relative' style={{height:"500px"}}>
                                            <div className='lineTimes' ref={linePresent}></div>
                                        </div>
                                        <h3 className='mt-4 text-white'>Present</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline;