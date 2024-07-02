import Navbar from '../../components/Navbar/navbar';
import Skills from '../../components/Skills/skills';
import SkillsProgress from '../../components/Skills/skillsProgress';
import WnatSkills from '../../components/Skills/skillsWant';

const SkillsPage = () => {
    return (
        <>
            <Navbar />
            <Skills />
            <div className='bg-soft pt-5' style={{minHeight:"100vh"}}>
                <div className='container d-flex justify-content-center px-5 pt-5'>
                    <div className='row g-4 w-100 mb-5'>
                        <div className='col-xl-6 col-md-6 col-sm-12 d-flex justify-content-start align-items-center flex-column'>
                            <SkillsProgress/>
                        </div>
                        <div className='col-xl-6 col-md-6 col-sm-12 d-flex justify-content-start align-items-center flex-column'>
                            <WnatSkills />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkillsPage;