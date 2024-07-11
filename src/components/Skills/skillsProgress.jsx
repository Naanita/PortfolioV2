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



const CurrentSkills = [
    {
        img: react,
        name: "React",
        progress: 80,
        color: "#00D8FF"
    },
    {
        img: redux,
        name: "Redux",
        progress: 70,
        color: "#7E57C2"
    },
    {
        img: node,
        name: "Node.js",
        progress: 30,
        color: "#21A366"
    },
    {
        img: express,
        name: "Express",
        progress: 30,
        color: "#000"
    },
    {
        img: js,
        name: "JavaScript",
        progress: 85,
        color: "#F7DF1E"
    },
    {
        img: html,
        name: "HTML",
        progress: 90,
        color: "#EE8E01"
    },
    {
        img: css,
        name: "CSS",
        progress: 90,
        color: "#1E96E9"
    },
    {
        img: bootstrap,
        name: "Bootstrap",
        progress: 80,
        color: "#6C19FF"
    },
    {
        img: tailwind,
        name: "Tailwind",
        progress: 50,
        color: "#00ACC1"
    },
    {
        img: ejs,
        name: "EJS",
        progress: 50,
        color: "#C0CA33"
    },
    {
        img: git,
        name: "Git",
        progress: 80,
        color: "#F4511E"
    },
    {
        img: gsapIcon,
        name: "GSAP",
        progress: 60,
        color: "#00E559"
    }
];



const SkillsProgress = () => {
    return (
        <>
            <h1 className='text-dark display-3 mb-3'>Current skills</h1>
            <p className='fs-5 text-dark-400 fw-light line-height-1 text-start'>This is an estimate of my experience with these tools. A numerical value does not define my capabilities, as every day I learn something new and also forget something.</p>
            {CurrentSkills.map((skill, index) => (
                <div className='row w-100 g-4'>
                    <div className='col-2'>
                        <div className='card-img' style={{ height: '80px' }}>
                            <img src={skill.img} alt={skill.name} className='w-100 h-100' />
                        </div>
                    </div>
                    <div className='col-10 d-flex align-items-start flex-column justify-content-center'>
                        <h5 className='mb-1 text-start fColvetica'>{skill.name}</h5>
                        <div className="progress w-100" role="progressbar" aria-valuenow={skill.progress} ria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={{ width: `${skill.progress}%`, background: `${skill.color}` }}>{skill.progress}%</div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SkillsProgress;
