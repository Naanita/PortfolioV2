import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import "./flexvu2.css"; // Import your CSS file for styles
import img1 from "../../assets/img/flexvu/1.jpg";
import img2 from "../../assets/img/flexvu/2.jpg";
import img3 from "../../assets/img/flexvu/3.jpg";
import img4 from "../../assets/img/flexvu/4.jpg";
import img5 from "../../assets/img/flexvu/5.jpg";
import img6 from "../../assets/img/flexvu/6.jpg";
import img7 from "../../assets/img/flexvu/7.jpg";
import img8 from "../../assets/img/flexvu/8.jpg";
import img9 from "../../assets/img/flexvu/9.jpg";
import img10 from "../../assets/img/flexvu/10.jpg";
import img11 from "../../assets/img/flexvu/11.jpg";
import img12 from "../../assets/img/flexvu/12.jpg";
import img13 from "../../assets/img/flexvu/13.jpg";
import img14 from "../../assets/img/flexvu/14.jpg";
import img15 from "../../assets/img/flexvu/15.jpg";
import img16 from "../../assets/img/flexvu/16.jpg";
import img17 from "../../assets/img/flexvu/17.jpg";
import img18 from "../../assets/img/flexvu/18.jpg";
import img19 from "../../assets/img/flexvu/19.jpg";
import img20 from "../../assets/img/flexvu/20.jpg";
import img21 from "../../assets/img/flexvu/21.jpg";
import img22 from "../../assets/img/flexvu/22.jpg";
import img23 from "../../assets/img/flexvu/23.jpg";
import img24 from "../../assets/img/flexvu/24.jpg";
import img25 from "../../assets/img/flexvu/25.jpg";
import img26 from "../../assets/img/flexvu/26.jpg";
import img27 from "../../assets/img/flexvu/27.jpg";
import img28 from "../../assets/img/flexvu/28.jpg";
import img29 from "../../assets/img/flexvu/29.jpg";
import img30 from "../../assets/img/flexvu/30.jpg";

gsap.registerPlugin(Draggable);

const images = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
    img21, img22, img23, img24,
];

const HorizontalScroller = () => {
    const [showOverlay, setShowOverlay] = useState(true);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    const handleOverlayClick = () => {
        const overlay = document.querySelector(".overlay");
        gsap.to(overlay, {
            opacity: 0,
            filter: "blur(20px)",
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => setShowOverlay(false),
        });
    };

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;


        content.style.width = `${images.length * 100}vw`;

        Draggable.create(content, {
            type: "x",
            bounds: { minX: -content.scrollWidth + container.offsetWidth, maxX: 0 },
            inertia: true,
            throwProps: true,
            onDragStart: () => {
                gsap.to(content, { duration: 0.2, ease: "power1.out", cursor: "grabbing" });
            },
            onDragEnd: () => {
                gsap.to(content, { duration: 0.2, ease: "power1.out", cursor: "grab" });
            },
        });

        return () => {
            Draggable.get(content)?.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="container-horizontal-scroller-flexvu">
            {showOverlay && (
                <div className="overlay" onClick={handleOverlayClick}>
                    <div className="overlay-content">
                        <div className="container">
                            <h1 className="display-3">Desliza hacia la derecha para explorar.</h1>
                            <i className="fa-regular fa-circle-play  display-1"></i>
                        </div>
                    </div>
                </div>
            )}
            <div ref={contentRef} className="content-horizontal-scroller-flexvu">
                {images.map((image, index) => (
                    <div key={index} className="section-horizontal-scroller-flexvu">
                        <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorizontalScroller;
