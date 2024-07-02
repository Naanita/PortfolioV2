import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./experience.css";
import bootstrap from "../../assets/svg/bootstrap.svg";
import css from "../../assets/svg/css.svg";
import ejs from "../../assets/svg/ejs.svg";
import html from "../../assets/svg/html.svg";
import js from "../../assets/svg/js.svg";
import node from "../../assets/svg/node.svg";
import react from "../../assets/svg/react.svg";
import tailwind from "../../assets/svg/tailwind.svg";
import redux from "../../assets/svg/redux.svg";
import git from "../../assets/svg/git.svg";
import gsapIcon from "../../assets/svg/gsap.svg";
import express from "../../assets/svg/express.svg";
import postgresql from "../../assets/svg/postgreSQL.svg";
import henry from "../../assets/svg/henry.svg";
import emp from "../../assets/svg/emp.svg";
import svg3 from "../../assets/svg/3.svg";
import svg4 from "../../assets/svg/4.svg";
import svg5 from "../../assets/svg/5.svg";

gsap.registerPlugin(ScrollTrigger);

const exp = [
{
logoCompany: henry,
position: "Full Stack Developer",
company: "Henry",
time: "Full time",
period: "Aug. 2022 - Feb. 2023",
duration: "7 months",
location: "Bogotá, Colombia",
typeWork: "Remote",
Skills: [
{
name: "HTML 5",
icon: html,
},
{
name: "CSS 3",
icon: css,
},
{
name: "Tailwind CSS",
icon: tailwind,
},
{
name: "PostgreSQL",
icon: postgresql,
},
{
name: "Node",
icon: node,
},
{
name: "Express",
icon: express,
},
{
name: "JavaScript",
icon: js,
},
{
name: "Redux",
icon: redux,
},
{
name: "React",
icon: react,
},
{
name: "Git",
icon: git,
},
],
description: `
<p>I started my career in web development without a solid understanding of programming languages and basic programming
    concepts. As I progressed in my career, I began to gain experience in building web applications using both front-end
    and back-end.</p>
<p>In my day job, I worked on team projects, collaborating with other developers. I took on tasks such as building
    components and API integration in front-end development, as well as programming server logic and database management
    in the back-end.</p>
<p>During my first months as a Fullstack developer, I spent a lot of time learning and improving my web development
    skills. I learned how to use different tools and technologies, such as web development frameworks like React, Redux,
    and CSS on the frontend, and PostgreSQL, JavaScript, and Express on the backend. I also learned how to work with
    databases, how to create APIs, and how to debug and troubleshoot.</p>
<p>As I gained more experience, I began to take on additional responsibilities on projects. I also took on more
    responsibility for the design and architecture of the projects I worked on.</p>
<p>Overall, my experience as a Fullstack developer was challenging but rewarding. I learned a lot and developed my
    skills as a web developer, which helped me advance my career as I gained more experience.</p>
`,
        link: "/experience/2",
},
{
logoCompany: emp,
position: "Front End Developer",
company: "Important Company in the Sector",
time: "Full time",
period: "Jul. 2023 - Present",
duration: "1 year",
location: "Bogotá, Colombia",
typeWork: "Hybrid",
Skills: [
{
name: "HTML 5",
icon: html,
},
{
name: "CSS 3",
icon: css,
},
{
name: "Bootstrap",
icon: bootstrap,
},
{
name: "GSAP",
icon: gsapIcon,
},
{
name: "Node",
icon: node,
},
{
name: "EJS",
icon: ejs,
},
{
name: "JavaScript",
icon: js,
},
{
name: "Redux",
icon: redux,
},
{
name: "React",
icon: react,
},
{
name: "Git",
icon: git,
},
],
description: `

<p>For the last year, I have worked as a front-end developer in a dynamic and growing company, where I have used a wide
    range of modern tools and technologies, including HTML, CSS, Bootstrap, GSAP, Node.js, EJS, Redux, React, and Git.
</p>
<p>My main responsibility was to design and develop intuitive and engaging user interfaces, ensuring a smooth and modern
    user experience. Throughout this time, I participated in the development of six significant projects, all of which
    involved consuming APIs, database management, and processing large amounts of data. I used technologies such as
    WebSocket and REST APIs for real-time communication and data exchange, creating efficient actions and middleware to
    ensure optimal performance.</p>
<p>In these projects, I leveraged Bootstrap to accelerate the development of responsive and consistent components and
    employed GSAP to implement sophisticated animations that enhanced user interaction. The combination of React and
    Redux facilitated the construction of robust user interfaces and efficient application state management, while
    Node.js and EJS enabled the creation of scalable and dynamic web applications.</p>
<p>My focus was always geared towards improving the UI and UX, making sure each design was visually appealing and easy
    to use. I worked with various JavaScript and React frameworks to optimize the performance and functionality of the
    applications. In addition, collaboration with the team was kept organized and efficient thanks to Git, allowing for
    clear version control management and facilitating teamwork.</p>
<p>This experience has been extremely valuable, contributing significantly to my professional growth and to the
    development of robust and functional web solutions. I have acquired essential skills in creating interactive and
    scalable applications, always with a strong focus on design and user experience.</p>
`,
link: "/experience/2",
},
];

const Experience = () => {
const containerRef = useRef(null);
const imgRef1 = useRef(null);
const imgRef2 = useRef(null);
const imgRef3 = useRef(null);

    useEffect(() => {
        if (window.innerWidth > 600) {
            const sections = gsap.utils.toArray(".panel");
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 2,
                    end: () =>
                        `+=${document.querySelector(".container-horizontal").offsetWidth}`,
                },
            });
        }
    }, []);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom center",
                scrub: 2,
            },
        });
        tl.to(imgRef2.current, { rotation: 360, ease: "none", left: "90%" }, 0);
        tl.to(imgRef1.current, { ease: "none", left: "-50%" }, 0);
        tl.to(".lightOp", { ease: "none", opacity: "0.5" }, 0);

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".FirstMe",
                start: "100% top",
                end: "200% center",
                scrub: 2,
            },
        });
        tl2.to(imgRef3.current, { rotation: 360, ease: "none" }, 0);
    }, []);
return (
<div ref={containerRef} className="container-horizontal bg-soft"
    style={{ minHeight: "100vh" }}>
    <div className="panel container-fluid d-flex justify-content-center align-items-center flex-column">
        <img ref={imgRef1} src={svg4} alt="" className="position-absolute z-3 d-sm-none d-md-none d-xl-block" 
            style={{ height: "60vh", top: "30%", left: "-5%" }} />
            <img ref={imgRef2} src={svg5} alt="" className="position-absolute z-3 svg-2 d-sm-none d-md-none d-xl-block"
            />
        <div className="border-animated animated-true" style={{ top: "5%", left: "-30%" }}></div>
        <div className="border-animated animated-true" style={{ top: "10%", left: "-30%", scale: "-1" }}></div>
        <div className="border-animated animated-true" style={{ top: "87%", left: "-45%", transform: "rotate(90deg)" }}></div>
        <div className="border-animated animated-true" style={{ top: "5%", left: "40%" }}></div>
        <div className="border-animated animated-true" style={{ top: "10%", left: "40%", scale: "-1" }}></div>
        <div className="lightOp circle-purple" style={{ opacity: "0", top: "0", right: "0", transform: "translate(95%, -5%)",}}></div>
        <div className="lightOp circle-pink-100" style={{ opacity: "0", top: "0", right: "0", transform: "translate(55%, 20%)", }}></div>
        <div className="lightOp circle-blue-100" style={{ opacity: "0", top: "0", right: "0", transform: "translate(60%, -30%)", }}></div>
        <h1 className="text-dark display-1Plus2 line-height-1">Experience</h1>
        <p className="fs-5 w-50 text-dark-400 fw-light line-height-1  text-center">Older to newer.</p>
    </div>
    {exp.map((exp, index) => (
    <div className={`panel container-fluid d-flex justify-content-center align-items-center flex-column
        position-relative ${index===1 ? "FirstMe" : "" }`} key={index}>
        {index % 2 === 0 ? (
        <>
            <div className="border-animated animated-true"
                style={{ top: "87%", left: "-45%", transform: "rotate(90deg)" }}></div>
            <div className="border-animated animated-true"
                style={{ top: "87%", left: "-42%", transform: "rotate(90deg)" }}></div>
            <div className="border-animated animated-true" style={{ top: "95%", left: "0%" }}></div>
                    <img ref={imgRef3} src={svg3} alt="" className="position-absolute z-3 d-sm-none d-md-none d-xl-block"
                style={{ height: "160px", top: "10%", right: "10%" }} />
        </>
        ) : (
        <>
            <div className="border-animated animated-true"
                style={{ top: "87%", left: "-45%", transform: "rotate(90deg)" }}></div>
            <div className="border-animated animated-true" style={{
                  top: "87%",
                  left: "-42%",
                  transform: "rotate(90deg)",
                  scale: "-1",
                }}></div>
            <div className="border-animated animated-true" style={{
                  top: "87%",
                  right: "-45%",
                  transform: "rotate(90deg)",
                }}></div>
            <div className="border-animated animated-true" style={{
                  top: "87%",
                  right: "-42%",
                  transform: "rotate(90deg)",
                  scale: "-1",
                }}></div>
            <div className="border-animated animated-true" style={{ top: "95%", left: "0%" }}></div>
        </>
        )}
        <div className="row w-75">
            <div className="col-xl-4 col-md-4 col-sm-12">
                <div className="card-img bg-dark h-100 d-flex justify-content-center align-items-center"
                    style={{ borderRadius: "12px" }}>
                    <img src={exp.logoCompany} alt={exp.company} style={{ width: "150px", height:"300px" }} />
                </div>
            </div>
            <div className="col-xl-8 col-md-8 col-sm-12">
                <h1 className="line-height-1 text-dark">{exp.position}</h1>
                <div className="d-flex">
                    <h6 className="text-dark-600">{exp.company}</h6>
                    <div className="mx-1 text-dark">·</div>
                    <h6 className="text-dark-600">{exp.time}</h6>
                </div>
                <div className="d-flex">
                    <p className="text-dark-400 m-0">{exp.period}</p>
                    <div className="mx-1 text-dark">·</div>
                    <p className="text-dark-400 m-0">{exp.duration}</p>
                </div>
                <div className="d-flex">
                    <p className="text-dark-400 m-0">{exp.location}</p>
                    <div className="mx-1 text-dark">·</div>
                    <p className="text-dark-400 m-0">{exp.typeWork}</p>
                </div>
                    <div className="d-flex justify-content-between align-items-center my-2 w-xl-50 flex-wrap">
                    {exp.Skills.map((skill, index) => (
                    <div className="position-relative tooltip-container mb-1" key={index}>
                        <span className="tooltip">{skill.name}</span>
                        <img src={skill.icon} alt={skill.name} className="skillsbyexp" />
                    </div>
                    ))}
                </div>
                <div className="y-2">
                    <div className="mb-2 text-suspensory-5lines" dangerouslySetInnerHTML={{ __html: exp.description }}>
                    </div>
                    <a className="btnAb hoverEffect-1 me-2" href={exp.link}>
                        <span>
                            <div className="group-hover fs-5">View More Detailed</div>
                            <div className="group-hover fs-5">View More Detailed</div>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    ))}
</div>
);
};

export default Experience;