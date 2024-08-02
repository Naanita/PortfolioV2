import './cards.css';
import styled from 'styled-components';
import Particles1 from '../particles/particles1.jsx';


const StyledCard = styled.div`  
--c1: ${props => `${props.color}`};
--c2: ${props => `${props.color}80`};

`;

const Card1 = ({ icon, title, description, hexColor, category, starts }) => {

    const generateStars = (numStars) => {
        let stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push(<i key={i} className="fa-regular fa-star"></i>);
        }
        return stars;
    };
    
    return (
        <StyledCard className='cardShape' color={hexColor}>
            <div className='d-flex justify-content-between align-items-center'>
                <div className="icon">
                    <div dangerouslySetInnerHTML={{ __html: icon }}></div>
                </div>
                <div className='forCategory'>
                    <div className='itemco'>
                        <div className='iconsC'>
                            {generateStars(starts)}
                        </div>
                        <div className='category'>{category }</div>
                    </div>
                </div>
            </div>
            <div className='contentC'>
                <div className='title'>{title}</div>
                <div className='description'>{description}</div>
                <a className='linkTo' href="#">
                    Learn more <i className="fa-solid fa-angles-right"></i>
                </a>
            </div>
            {/* <div className='particlesC'>
                <Particles1 id={title} />
            </div> */}
            <div className='iconXL' dangerouslySetInnerHTML={{ __html: icon }}></div>
        </StyledCard>
    )
}
export default Card1;