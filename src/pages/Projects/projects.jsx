import Navbar from "../../components/Navbar/navbar";
import book from '../../assets/img/bookBrewery.png';
import creatrs from '../../assets/img/creatrs.png';
import creatrsAi from '../../assets/img/creatrsai.png';
import flipzine from '../../assets/img/flipzine.png';
import museum from '../../assets/img/museums.png';
import spnsr from '../../assets/img/spnsr.png';
import Card1 from '../../components/Cards/card1';
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
        <>
            <Navbar />
            <div className='bg-soft' style={{ minHeight: "100vh" }}>
                <div className="container-fluid px-xl-5 d-flex flex-column align-items-center">
                <h1 className="text-dark line-height-1 display-1Plus2 mt-5 pt-5">Projects</h1>
                <div className="row g-4 w-100 my-5" style={{ minHeight: "100vh" }}>
                    {projects.map((project, index) => {
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
                </div>
            </div>
        </>
    );
};

export default Projects;