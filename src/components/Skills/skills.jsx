import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './skills.css';
import bootstrap from '../../assets/svg/bootstrap.svg';
import css from '../../assets/svg/css.svg';
import ejs from '../../assets/svg/ejs.svg';
import html from '../../assets/svg/html.svg';
import js from '../../assets/svg/js.svg';
import node from '../../assets/svg/node.svg';
import react from '../../assets/svg/react.svg';
import tailwind from '../../assets/svg/tailwind.svg';
import redux from '../../assets/svg/redux.svg';
import git from '../../assets/svg/git.svg';
import gsapIcon from '../../assets/svg/gsap.svg';
import express from '../../assets/svg/express.svg';

gsap.registerPlugin(ScrollTrigger);

const items = [
    {
        img: react,
        name: "React",
        parllaxSpeed: 0.065,
        top: "45%",
        left: "20%"
    },
    {
        img: html,
        name: "HTML 5",
        parllaxSpeed: 0.05,
        top: "30%",
        left: "30%"
    },
    {
        img: bootstrap,
        name: "Bootstrap 5",
        parllaxSpeed: 0.08,
        top: "60%",
        left: "20%"
    },
    {
        img: css,
        name: "CSS 3",
        parllaxSpeed: 0.1,
        top: "60%",
        left: "70%"
    },
    {
        img: ejs,
        name: "EJS",
        parllaxSpeed: 0.07,
        top: "10%",
        left: "90%"
    },
    {
        img: js,
        name: "JavaScript",
        parllaxSpeed: 0.085,
        top: "30%",
        left: "60%"
    },
    {
        img: node,
        name: "Node.js",
        parllaxSpeed: 0.06,
        top: "10%",
        left: "10%"
    },
    {
        img: tailwind,
        name: "Tailwind CSS",
        parllaxSpeed: 0.04,
        top: "80%",
        left: "90%"
    },
    {
        img: redux,
        name: "Redux",
        parllaxSpeed: 0.1,
        top: "10%",
        left: "50%"
    },
    {
        img: git,
        name: "Git",
        parllaxSpeed: 0.065,
        top: "85%",
        left: "50%"
    },
    {
        img: gsapIcon,
        name: "GSAP",
        parllaxSpeed: 0.065,
        top: "45%",
        left: "75%"
    },
    {
        img: express,
        name: "Express.js",
        parllaxSpeed: 0.065,
        top: "80%",
        left: "10%"
    },
];


const Skills = () => {
    const galleryRef = useRef(null);
    const location = useLocation();
    
    useEffect(() => {
        const gallery = galleryRef.current;
        const galleryItems = gallery.querySelectorAll(".itemSkills");
        gsap.timeline({
            scrollTrigger: {
                trigger: gallery,
                start: "top bottom",
                end: "bottom center",
            }
        })
            .fromTo(galleryItems,
                { opacity: 0, scale: 0.1 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.75,
                    stagger: 0.2,
                }
            );
        document.addEventListener("mousemove", (e) => {
            galleryItems.forEach((item, index) => {
                const animationFactor = items[index].parllaxSpeed;
                const deltaX = (e.clientX - window.innerWidth / 2) * animationFactor;
                const deltaY = (e.clientY - window.innerHeight / 2) * animationFactor;
                gsap.to(item, { x: deltaX, y: deltaY, duration: 0.75 });
            });
        });
    }, []);

    return (
        <div className="container-fluid position-relative d-flex justify-content-center align-items-center bg-soft overflow-hidden" style={{ minHeight: '100vh'}}>
            <div className="border-animated animated-true" style={{ top: "4%", left: "-45%", transform: "rotate(90deg)" }}></div>
            <div className="border-animated animated-true" style={{ top: "4%", left: "-42%", transform: "rotate(90deg)", scale: "-1" }}></div>
            <div className="border-animated animated-true" style={{ top: "4%", left: "42%", transform: "rotate(90deg)" }}></div>
\
            <div className="item-center position-absolute text-center d-flex flex-column justify-content-center align-items-center z-3">
                <h1 className="text-dark display-1Plus2 line-height-1">Skills</h1>
                <p className='text-dark-500 small w-xl-75 mb-2'>I am constantly looking for new technologies and tools to expand my skills and keep myself updated in web development. My goal is to keep learning and growing professionally to offer innovative and efficient solutions.</p>
                <a className={`btnAb hoverEffect-1 me-2 ${location.pathname !== '/' ? 'd-none' : '' }`} href="/skills/">
                    <span>
                        <div className="group-hover fs-5">View More Detailed</div>
                        <div className="group-hover fs-5">View More Detailed</div>
                    </span>
                </a>
            </div>
            <div className="gallery" ref={galleryRef}>
                {items.map((item, index) => (
                    <div className="itemSkills tooltip-container" key={index} style={{ top: item.top, left: item.left }}>
                        <span className="tooltip">{item.name}</span>
                        <img src={item.img} alt={item.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skills;