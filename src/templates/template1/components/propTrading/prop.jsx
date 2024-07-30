import './prop.css';
import { useEffect, useRef } from 'react';
import v1 from '../../assets/video/1.mp4'
import v2 from '../../assets/video/2.mp4'   
import v3 from '../../assets/video/3.mp4'
import v4 from '../../assets/video/4.mp4'
import HorizontalTextLeft from '../horizontalText/horizontalTextLeft.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';


gsap.registerPlugin(ScrollTrigger);



const Prop = () => {

    const titleref = useRef(null);
    const mainContainer = useRef(null);

    useEffect(() => { 
        const splitTitle1 = new SplitType(titleref.current, { type: "chars, words, lines" });

        gsap.from(splitTitle1.chars, {
            scrollTrigger: {
                trigger: mainContainer.current,
                start: "top center",
                end: "bottom top",
                toggleActions: "play none none none",
            },
            opacity: 0,
            y: 80,
            rotateX: 90,
            stagger: .03,
        })

    }, []);
    return (
        <div className='min-vh-100 z-4 position-relative pb-4' ref={mainContainer} style={{ background: "#070707" }}>
            <div className="container">
                <h1 className="display-1 line-height-1 text-white m-0 text-center mb-5" ref={titleref} style={{ paddingTop: "10rem" }}>Traders from more tahn 150 <br /> countries around the world have registered!</h1>
                <div className="Forx4x4">
                    <div className="div1">
                        <div className='card h-100 card-up'>
                            <div className='gradientBg'>
                                <div className='position-absolute bottom-0 p-2 w-75'>
                                    <h1 className='text-white'>No time Limit Prop firm</h1>
                                    <p className='text-white'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, aperiam!</p>
                                </div>
                            </div>
                            <video className='w-100 h-100 object-fit-cover' src={v1} autoPlay muted loop></video>
                        </div>
                    </div>
                    <div className="div2">
                        <div className='card h-100 card-up'>
                            <div className='gradientBg'>
                            <div className='position-absolute bottom-0 p-2 w-75'>
                                <h1 className='text-white'>No time Limit Prop firm</h1>
                                <p className='text-white'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, aperiam!</p>
                            </div>
                            </div>
                            <video className='w-100 h-100 object-fit-cover' src={v4} autoPlay muted loop></video>
                        </div>
                    </div>
                    <div className="div3">
                        <div className='card h-100 card-up'>
                            <div className='gradientBg'>
                            <div className='position-absolute bottom-0 p-2 w-75'>
                                <h1 className='text-white'>No time Limit Prop firm</h1>
                                <p className='text-white'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, aperiam!</p>
                            </div>
                            </div>
                            <video className='w-100 h-100 object-fit-cover' src={v3} autoPlay muted loop></video>
                        </div>
                    </div>
                    <div className="div4">
                        <div className='card h-100 card-up'>
                            <div className='gradientBg'>
                            <div className='position-absolute bottom-0 p-2 w-75'>
                                <h1 className='text-white'>No time Limit Prop firm</h1>
                                <p className='text-white'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, aperiam!</p>
                            </div>
                            </div>
                            <video className='w-100 h-100 object-fit-cover' src={v2} autoPlay muted loop></video>
                        </div>
                    </div>
                </div>  
            </div>
            <HorizontalTextLeft
                text="Traders from more than 150 countries around the world have registered!"
                container=".Forx4x4"
            />
        </div>
    )
}
export default Prop;