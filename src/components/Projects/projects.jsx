import './projects.css';
import book from '../../assets/img/bookBrewery.png';
import creatrs from '../../assets/img/creatrs.png';
import creatrsAi from '../../assets/img/creatrsai.png';
import flipzine from '../../assets/img/flipzine.png';
import museum from '../../assets/img/museums.png';
import spnsr from '../../assets/img/spnsr.png';
import Card1 from '../Cards/card1';
import game from '../../assets/img/game.png';
import vino from '../../assets/img/vino.png';


const projects = [
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
        type: ['CSS3', 'HTML5', 'Bootstrap 5', 'JavaScript', 'EJS', 'Git', 'JavaScript Frameworks'],
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
]

const Projects = () => {
    return (
        <div className="container-fluid position-relative bg-soft" style={{ minHeight: '100vh'}}>
            <h1 className='text-dark display-1Plus2 pt-5 text-center mb-5'>Projects</h1>
            <div className='container-fluid d-flex flex-column px-xl-5 py-3'>
                <div className="parent" style={{ minHeight: "120vh" }}>
                    {projects.slice(0, 6).map((project, index) => (
                        <div className={`div${project.id}`} key={index}>
                            <Card1
                                link={project.link}
                                title={project.title}
                                img={project.img}
                                types={project.type}
                            />
                        </div>
                    ))}
                </div>
                <div className='pt-4'>
                    <a className='btnAb hoverEffect-1 text-center w-100 d-block' href="/projects">
                        <span>
                            <div className="group-hover fs-1">View More Projects</div>
                            <div className="group-hover fs-1">View More Projects</div>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Projects;