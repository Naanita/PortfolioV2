import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './home.css';
import gsap from 'gsap';
import SplitText from 'split-text-js';
import AboutMe from '../../components/AboutMe/aboutme';
import Navbar from '../../components/Navbar/navbar';
import Skills from '../../components/Skills/skills';
import Experience from '../../components/Experience/experience';
import Projects from '../../components/Projects/projects';
import Contact from '../../components/Contact/contact';
import Templates from '../../components/Templates/templates';

const Home = () => {
    const location = useLocation();
    const [hash, setHash] = useState(location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setHash(location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        const scrollToElement = () => {
            const element = document.querySelector(hash);
            if (element) {
                requestAnimationFrame(() => {
                    element.scrollIntoView();
                });
            }
        };
        if (hash) {
            setTimeout(scrollToElement, 100);
        }
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [hash, location.hash]);


    
    useEffect(() => {
        const titles = gsap.utils.toArray('.text-wrapper h1');
        const tl = gsap.timeline({
            repeat: -1,
            onRepeat: () => tl.restart()
        });
        titles.forEach((title, index) => {
            const splitTitle = new SplitText(title, { type: "chars, words, lines" });
            tl.from(splitTitle.chars, {
                opacity: 0,
                y: 80,
                rotateX: -90,
                stagger: .03,
            }, '<')
                .to(splitTitle.chars, {
                    opacity: 0,
                    y: -80,
                    rotateX: 90,
                    stagger: .03,
                }, '<1.5')
        });
    }, []);
    const skillsRef = useRef(null);
    const aboutRef = useRef(null);
    const expRef = useRef(null);
    const templatesRef = useRef(null);
    const contactRef = useRef(null);
    const projectsRef = useRef(null);
    const firstLay  = useRef(null);
    const sectionRefs = [firstLay, aboutRef, skillsRef, expRef, templatesRef, projectsRef, contactRef];

    return (
        <>
            <Navbar sectionRefs={sectionRefs} />
            <div ref={firstLay} className='container-fluid position-relative d-flex flex-column justify-content-center align-items-center overflow-hidden bg-soft' style={{minHeight:"103vh"}}>
                <div className='circle-purple' style={{ top:'0', right:'0', transform: "translate(35%, -5%)"}}></div>
                <div className='circle-pink-100' style={{ top:'0', right:'0', transform: "translate(-5%, 20%)"}}></div>
                <div className='circle-blue-100' style={{ top: '0', right: '0', transform: "translate(-30%, -30%)" }}></div>
                <div className='circle-purple' style={{ bottom: '0', left: '0', transform: "translate(35%, -5%)" }}></div>
                <div className='circle-pink-100' style={{ bottom: '0', left: '0', transform: "translate(-5%, 20%)" }}></div>
                <div className='circle-blue-100' style={{ bottom: '0', left: '0', transform: "translate(-30%, -30%)" }}></div>
                <div className="border-animated animated-true" style={{ top: "85%", left: "-45%", transform: "rotate(90deg)" }}></div>
                <div className="border-animated animated-true" style={{ top: "85%", left: "-42%", transform: "rotate(90deg)", scale: "-1"}}></div>
                <div className="border-animated animated-true" style={{ top: "85%", left: "42%", transform: "rotate(90deg)" }}></div>
                <div className="border-animated animated-true" style={{ top: "20%", right: "0%"}}></div>
                <div className="border-animated animated-true" style={{ top: "15%", left: "0%", scale:"-1"}}></div>
                <div className='container'>
                    <div className='text-wrapper'>
                        <h1>Front End</h1>
                        <h1>React</h1>
                        <h1>Web</h1>
                        <h1>UI / UX</h1>
                        <h1>JavaScript</h1>
                        <h1>Visual</h1>
                        <h1>Interactive</h1>
                    </div>
                    <h1 className='text-dark text-center display-1Plus2 line-height-1 mt-xl-7 mt-sm-4 mt-md-3 position-relative z-1'> Developer</h1>
                </div>
            </div>
            <section ref={aboutRef} id='about-me'>
            <AboutMe />
            </section>
            <section ref={skillsRef} id='skills'>
                <Skills />
            </section>
            <section ref={expRef} id='experience'>
                <Experience />
            </section>
            <section ref={templatesRef} id='templates'>
                <Templates  />
            </section>
            <section ref={projectsRef} id='projects'>
                <Projects  />
            </section>
            <section ref={contactRef} id='contact'>
                <Contact  />
            </section>
            
        </>
    );
};

export default Home;