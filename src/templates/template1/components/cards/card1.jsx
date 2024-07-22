
import './cards.css';


const Card1 = ({number}) => {
    return (
        <div className='cardShape'>
            <div className='d-flex justify-content-between align-'>
                <div className="icon">
                    <div>1</div>
                </div>
                <div className='forCategory'>
                    <div className='itemco'>
                        <div className='iconsC'>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
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
                <a className='linkTo' href="">
                    Learn more <i class="fa-solid fa-angles-right"></i>
                </a>
            </div>
        </div>
    )
 }
export default Card1;