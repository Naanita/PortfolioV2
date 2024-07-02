import { useRef, useEffect } from 'react';
import me from '../../assets/img/me.webp';
import svg2 from '../../assets/svg/2.svg';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './about.css';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
    const imgRef = useRef(null);
    const main = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.to(imgRef.current, {
            rotation: 360,
            scrollTrigger: {
                trigger: imgRef.current,
                start: "top center",
                end: "bottom top",
                scrub: 10
            }
        });
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: main.current,
                start: "center center",
                end: "bottom top",
                scrub: true,
            }
        });
        tl.to(containerRef.current, { width: '95%', ease: "none" }, 0);
    }, []);

    return (
        <div className='position-relative bg-soft' ref={main}>
            <div className="border-animated animated-true" style={{ top: "85%", left: "-45%", transform: "rotate(90deg)"}}></div>
            <div className="border-animated animated-true" style={{ top: "85%", left: "-42%", transform: "rotate(90deg)", scale: "-1" }}></div>
            <div className="border-animated animated-true" style={{ top: "85%", left: "42%", transform: "rotate(90deg)" }}></div>
            <div ref={containerRef} className="mx-auto bg-white position-relative z-3 d-flex justify-content-center align-items-center" style={{ borderRadius: '24px', minHeight: '100vh', transform: 'translateY(-2%)' }}>
                <img ref={imgRef} src={svg2} alt="" className='position-absolute z-3 svg-about' />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-md-6 col-sm-12 position-relative mt-3">
                            <div className='dotten-bg position-absolute' style={{ height: '80vh', top: "-9%", left: '-20%', width: "20vw" }}></div>
                            <div className='card-img'>
                                <img src={me} className='w-100 h-100' alt="me" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-start flex-column mt-3">
                            <div className='d-flex justify-content-center align-items-center'>
                                <h1 className="text-dark display-1 me-xl-3">Who am I?</h1>
                            </div>
                            <p className="text-dark">Hi! I'm Sebastián, a <strong>web developer</strong> passionate about creating exceptional <strong>digital experiences</strong>. In my portfolio, you will find a selection of <strong>projects</strong> that showcase my <strong>skills</strong> and <strong>creativity</strong> in the world of <strong>web development</strong>.</p>
                            <p>With a focus on <strong>innovation</strong> and <strong>quality</strong>, I strive to deliver <strong>web solutions</strong> that not only meet expectations but exceed them. From intuitive <strong>design</strong> to impeccable <strong>technical implementation</strong>, each project is an opportunity to push boundaries and learn something new.</p>
                            <p>Enjoy exploring my work. If you have any questions or would like to collaborate on a project, feel free to contact me. Thank you for visiting my portfolio. I hope we can work together soon!</p>
                            <div className='d-flex mb-5'>
                                <a className='btnAb hoverEffect-1 me-2' href="#contact">
                                    <span>
                                        <div className="group-hover fs-5">Contact me</div>
                                        <div className="group-hover fs-5">Contact me</div>
                                    </span>
                                </a>
                                <a className='btnAb hoverEffect-1' href="/projects">
                                    <span>
                                        <div className="group-hover fs-5">View my work</div>
                                        <div className="group-hover fs-5">View my work</div>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutMe;