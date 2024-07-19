import { useEffect, useRef } from 'react';
import Particles1 from '../particles/particles1.jsx';
import gsap from 'gsap';
import './payouts.css';

const Payouts = () => {
    const main = useRef(null);
    const leftSide = useRef(null);
    const rightSide = useRef(null);
    const leftSideImg = useRef(null);
    const rightSideImg = useRef(null);

    useEffect(() => {
        const leftSideEl = leftSide.current;
        const leftSideImgEl = leftSideImg.current;
        leftSideEl.addEventListener('mouseenter', () => gsap.to(leftSideImgEl, { opacity: 1, duration: 0.5 }));
        leftSideEl.addEventListener('mouseleave', () => gsap.to(leftSideImgEl, { opacity: 0, duration: 0.5 }));

        const rightSideEl = rightSide.current;
        const rightSideImgEl = rightSideImg.current;
        rightSideEl.addEventListener('mouseenter', () => gsap.to(rightSideImgEl, { opacity: 1, duration: 0.5 }));
        rightSideEl.addEventListener('mouseleave', () => gsap.to(rightSideImgEl, { opacity: 0, duration: 0.5 }));

        return () => {
            leftSideEl.removeEventListener('mouseenter', () => gsap.to(leftSideImgEl, { opacity: 1, duration: 0.5 }));
            leftSideEl.removeEventListener('mouseleave', () => gsap.to(leftSideImgEl, { opacity: 0, duration: 0.5 }));
            rightSideEl.removeEventListener('mouseenter', () => gsap.to(rightSideImgEl, { opacity: 1, duration: 0.5 }));
            rightSideEl.removeEventListener('mouseleave', () => gsap.to(rightSideImgEl, { opacity: 0, duration: 0.5 }));
        };
    }, []);

    return (
        <div className="min-vh-100 bg-temp1-1 position-relative z-4 overflow-hidden" ref={main}>
            <div className='d-flex justify-content-center align-items-center position-absolute inset flex-column'>
                <div className='circle-green position-absolute z-n1' style={{ height: "250px", width: "250px" }}></div>
                <div className='position-absolute' style={{top:"20%", left:"30%"}}>
                    <Particles1 />
                </div>
                <div className='position-absolute' style={{ top: "55%", left:"53%" }}>
                    <Particles1 id='2' />
                </div>
                <div className="skertImg">
                    <div className='card-img position-absolute inset' ref={leftSideImg} style={{ opacity: 0 }}>
                        <img src="https://images.pexels.com/photos/15458645/pexels-photo-15458645/free-photo-of-naturaleza-agua-abstracto-resumen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-100 h-100 object-fit-cover" />
                    </div>
                    <div className='card-img position-absolute inset' ref={rightSideImg} style={{ opacity: 0 }}>
                        <img src="https://images.pexels.com/photos/5192286/pexels-photo-5192286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-100 h-100 object-fit-cover" />
                    </div>
                </div>
                <p className='fs-5 text-white w-xl-50  mt-4 text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam incidunt excepturi perspiciatis est nostrum molestiae suscipit delectus fugit, blanditiis saepe!</p>
            </div>
            <div className='leftSide' ref={leftSide}>
                <h1 className="topStar-center display-1Plus3">Payouts</h1>
            </div>
            <div className='rightSide' ref={rightSide}>
                <h1 className="topLeft-center display-1Plus3">Certificates</h1>
            </div>
        </div>
    );
}

export default Payouts;