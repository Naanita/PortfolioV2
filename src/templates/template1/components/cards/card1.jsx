import './cards.css';
import styled from 'styled-components';
import Particles1 from '../particles/particles1.jsx';


const StyledCard = styled.div`  
--c1: ${props => `${props.color}`};
--c2: ${props => `${props.color}60`};

`;

const Card1 = ({ number, color, title, descroption }) => {

    document.documentElement.style.setProperty('--a', `${color}`);
    return (
        <StyledCard className='cardShape' color={color}>
            <div className='d-flex justify-content-between align-items-center'>
                <div className="icon">
                    <div>{number}</div>
                </div>
                <div className='forCategory'>
                    <div className='itemco'>
                        <div className='iconsC'>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                        </div>
                        <div className='category'>
                            For experienced traders.
                        </div>
                    </div>
                </div>
            </div>
            <div className='contentC'>
                <div className='title'>Diamond</div>
                <div className='description'>
                    Fxology Diamond phase training program
                </div>
                <a className='linkTo' href="#">
                    Learn more <i className="fa-solid fa-angles-right"></i>
                </a>
            </div>
            <div className='particlesC'>
                <Particles1  id='particles' />
            </div>
            <div className='iconXL'>{number}</div>
        </StyledCard>
    )
}
export default Card1;