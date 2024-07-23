import './program.css';
import Card1 from '../cards/card1.jsx';
const programs = () => { 
    return (
        <div className='min-vh-100 bg-temp1-1 position-relative z-4 overflow-hidden'>
            <div className='d-flex justify-content-center align-items-center flex-wrap carsaw'>
                <Card1 number={2} color='#aeffc6' />
                <Card1 number={1} color='#00ff4c' />
                <Card1 number={1} color='#00ff4c' />
            </div>
        </div>
    )   
}

export default programs;