import angular from '../../assets/svg/angular.svg';
import vue from '../../assets/svg/vue.svg';
import python from '../../assets/svg/python.svg';
import three from '../../assets/svg/Three.svg';


const whantSkills = [
    {
        name: "Three.js",
        img: three,
    },
    {
        name: "Angular",
        img: angular,
    },
    {
        name: "Vue",
        img: vue,
    },
    {
        name: "Python",
        img: python,
    },

]


const WnatSkills = () => {
    return (
        <>
            <h1 className='text-dark display-3 mb-3'>Learning Objectives</h1>
            <div className='row w-100 g-4'>
                {whantSkills.map((skill, index) => (
                    <div className='col-4 d-flex justify-content-center flex-column align-items-center'>
                        <div className='card-img' style={{ height: '80px' }}>
                            <img src={skill.img} alt='{skill.name}' className='w-100 h-100' />
                        </div>
                        <h3 className='text-dark'>{skill.name}</h3>
                    </div>
                ))}
            </div>
            
        </>
    );
 }
export default WnatSkills;