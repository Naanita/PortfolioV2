import './program.css';
import Card1 from '../cards/card1.jsx';
const programs = () => { 
    return (
        <div className='min-vh-100 bg-temp1-1 position-relative z-4 overflow-hidden'>
            <Card1 number={1} />
        </div>
    )   
}

export default programs;