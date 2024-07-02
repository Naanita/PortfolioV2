import { useEffect, useRef, useState } from "react";
import { useParams} from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import ScrollTrigger from "gsap/ScrollTrigger";
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
import Projects from "../../components/Projects/projects";
import book from '../../assets/img/bookBrewery.png';
import creatrs from '../../assets/img/creatrs.png';
import creatrsAi from '../../assets/img/creatrsai.png';
import flipzine from '../../assets/img/flipzine.png';
import museum from '../../assets/img/museums.png';
import spnsr from '../../assets/img/spnsr.png';
import game from '../../assets/img/game.png';
import vino from '../../assets/img/vino.png';
import Card1 from '../../components/Cards/card1';
import ExperiencePagination from '../../components/Paginate/paginate1';






const exp = [
    {
        id: 1,
        logoCompany: henry,
        position: "Full Stack Developer",
        company: "Henry",
        time: "Full time",
        period: "Aug. 2022 - Feb. 2023",
        duration: "7 months",
        location: "Bogotá, Colombia",
        Projects: [
            {
                title: 'Game Atlas',
                img: game,
                type: ['HTML', 'Node', 'REST', 'CSS3', 'React', 'Redux', 'PostgreSQL', 'Express', 'API', 'JavaScript', 'Git'],
                link: 'https://proyecto-individual-chi.vercel.app/',
                id: 1
            },
            {
                title: 'Vino Rojo Bodegón',
                img: vino,
                type: ['HTML', 'Node', 'REST', 'CSS3', 'React', 'Redux', 'MongoDB', 'Express', 'API', 'JavaScript', 'Git', 'Tailwind CSS'],
                link: 'https://vino-rojo-bodegon.vercel.app/',
                id: 2
            },
        ],
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
        link: "/experience/1",
    },
    {
        id: 2,
        logoCompany: emp,
        position: "Front End Developer",
        company: "Important Company in the Sector",
        time: "Full time",
        period: "Jul. 2023 - Present",
        duration: "1 year",
        location: "Bogotá, Colombia",
        Projects: [
            {
                title: 'Spnsr.co',
                img: spnsr,
                type: ['CSS3', 'HTML5', 'Bootstrap 5', 'JavaScript', 'EJS', 'Git'],
                link: 'https://spnsr.co/',
                id: 1
            },
            {
                title: 'Book Brewery',
                img: book,
                type: ['CSS3', 'HTML5', 'Bootstrap 5', 'JavaScript', 'EJS', 'Git', 'GSAP', 'JavaScript Frameworks'],
                link: 'https://bookbrewery.com/',
                id: 2
            },
            {
                title: 'Creatrs',
                img: creatrs,
                type: ['CSS3', 'HTML5', 'Bootstrap 5', 'JavaScript', 'EJS', 'Git','JavaScript Frameworks'],
                link: 'https://creatr.studio/user',
                id: 3
            },
            {
                title: 'Creatrs.ai',
                img: creatrsAi,
                type: ['CSS3', 'HTML5', 'Bootstrap 5', 'JavaScript', 'EJS', 'Git', 'JavaScript Frameworks'],
                link: 'https://creatrs.ai/',
                id: 4
            },
            {
                title: 'Flipzine.co',
                img: flipzine,
                type: ['CSS3', 'HTML5', 'Bootstrap 5', 'JavaScript', 'EJS', 'Git', 'GSAP', 'JavaScript Frameworks'],
                link: 'https://flipzine.co/',
                id: 5
            },
            {
                title: 'Museums',
                img: museum,
                type: ['CSS3', 'HTML5', 'Bootstrap 5', 'JavaScript', 'React', 'Redux', 'Git', 'GSAP', 'JavaScript Frameworks'],
                link: 'https://museums.com/',
                id: 6
            },
        ],
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

const UniqExperience = () => {
    const { id } = useParams();
    const [selectedExperience, setSelectedExperience] = useState(null);

    useEffect(() => {
        const experience = exp.find(item => item.id.toString() === id);
        setSelectedExperience(experience);
    }, [id]);
    return (
        <>
            <Navbar />
            <div className='bg-soft' style={{ minHeight: "100vh" }}>
                {selectedExperience ? (
                    <>
                        <div className="bg-dark d-flex justify-content-center align-items-center mx-auto" style={{ height: '60vh', borderEndEndRadius: "12px", borderEndStartRadius: "12px" }}>
                            <div className="card-img" style={{ height: "150px" }}>
                                <img src={selectedExperience.logoCompany} alt={selectedExperience.company} className='w-100 h-100' />
                            </div>
                        </div>
                        <div className="container-fluid d-flex px-xl-5 align-items-center flex-column">
                            <div className="py-5 row g-4 w-100">
                                <div className="col-xl-7 col-md-7 col-sm-12 order-xl-1 order-md-1 order-sm-2">
                                    <h1 className="text-dark line-height-1 display-1 text- mb-5">{selectedExperience.position}</h1>
                                    <p dangerouslySetInnerHTML={{ __html: selectedExperience.description }}></p>
                                </div>
                                <div className="col-xl-5 col-md-5 col-sm-12 order-xl-2 order-md-2 order-sm-1">
                                    <div className="position-xl-sticky" style={{top:"10%"}}>
                                        <div className="d-flex">
                                            <h1 className="text-dark m-0">{selectedExperience.company}</h1>
                                            <h1 className="mx-1 text-dark m-0">·</h1>
                                            <h1 className="text-dark m-0">{selectedExperience.time}</h1>
                                        </div>
                                        <div className="d-flex">
                                            <p className="text-dark-400 m-0 fs-4">{selectedExperience.period}</p>
                                            <div className="mx-1 text-dark fs-4">·</div>
                                            <p className="text-dark-400 m-0 fs-4">{selectedExperience.duration}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="text-dark-400 m-0 fs-5">{selectedExperience.location}</p>
                                            <div className="mx-1 text-dark fs-5">·</div>
                                            <p className="text-dark-400 m-0 fs-5">{selectedExperience.typeWork}</p>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center my-2 w-100 flex-wrap">
                                            {selectedExperience.Skills.map((skill, index) => (
                                                <div className="position-relative tooltip-container" key={index}>
                                                    <span className="tooltip">{skill.name}</span>
                                                    <img src={skill.icon} alt={skill.name} className="skillsbyexpx2" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 w-100 my-5" style={{ minHeight: "100vh" }}>
                                <h1 className="text-dark line-height-1 display-1 text- mb-5">Projects</h1>
                                {selectedExperience.Projects.map((project, index) => {
                                    const patternIndex = index % 6;
                                    return (
                                        <>
                                            {patternIndex === 0 &&
                                                <div className="col-xl-6 col-md-6 col-sm-12">
                                                    <Card1
                                                        link={project.link}
                                                        title={project.title}
                                                        img={project.img}
                                                        types={project.type}
                                                    />
                                                </div>}
                                            {(patternIndex === 1 || patternIndex === 2 || patternIndex === 3 || patternIndex === 4) && (
                                                <div className="col-xl-3 col-md-3 col-sm-12">
                                                    <Card1
                                                        link={project.link}
                                                        title={project.title}
                                                        img={project.img}
                                                        types={project.type}
                                                    />
                                                </div>
                                            )}
                                            {patternIndex === 5 &&
                                                <div className="col-xl-6 col-md-6 col-sm-12">
                                                    <Card1
                                                        link={project.link}
                                                        title={project.title}
                                                        img={project.img}
                                                        types={project.type}
                                                    />
                                                </div>
                                            }
                                        </>
                                    );
                                })}
                            </div>
                            <ExperiencePagination exp={exp} />
                        </div>
                    </>
                ) : (
                    null
                )}
            </div>
        </>
    );
};

export default UniqExperience;
