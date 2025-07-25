import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import "./HorizontalScroller.css";

gsap.registerPlugin(Draggable);

const totalImages = 15;
const images = Array.from({ length: totalImages }, (_, i) => 
    `https://pub-e8dfc6d008cf460f9e1ccbc53126c812.r2.dev/${i + 1}.jpg`
);

const AcuSeek = () => {
    const [showOverlay, setShowOverlay] = useState(true);
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const draggableInstance = useRef(null);
    
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);

    const handleImageProcessed = () => {
        setLoadedImagesCount(prevCount => prevCount + 1);
    };

    const handleOverlayClick = () => {
        window.parent.postMessage({
            type: "analytics-event",
            event: "clic_inicio_exploracion",
            category: "Interacción",
            label: "Overlay Scroller",
            value: 1
        }, "*");

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
        if (loadedImagesCount < totalImages) return;

        const timer = setTimeout(() => {
            console.log("¡Imágenes listas y renderizadas! Creando Draggable ahora.");
            const container = containerRef.current;
            const content = contentRef.current;

            if (!container || !content) return;

            if (draggableInstance.current) {
                draggableInstance.current.kill();
            }

            const dragger = Draggable.create(content, {
                type: "x",
                bounds: { 
                    minX: () => -(content.scrollWidth - container.offsetWidth), 
                    maxX: 0 
                },
                inertia: true,
                throwProps: true,
                onDragStart: () => gsap.to(content, { cursor: "grabbing" }),
                onDragEnd: () => gsap.to(content, { cursor: "grab" }),
            });

            draggableInstance.current = dragger[0];
        }, 100); 

        return () => clearTimeout(timer);
        
    }, [loadedImagesCount]);

    
    useEffect(() => {
        return () => {
            if (draggableInstance.current) {
                draggableInstance.current.kill();
            }
        };
    }, []);

    return (    
        <div ref={containerRef} className="horizontal-scroller-container">
            {showOverlay && (
                <div className="overlay" onClick={handleOverlayClick}>
                    <div className="overlay-content">
                        <div className="container">
                            <h1 className="display-3">Desliza para explorar.</h1>
                            <i className="fa-regular fa-circle-play display-1"></i>
                        </div>
                    </div>
                </div>
            )}
            <div ref={contentRef} className="horizontal-scroller-content">
                {images.map((image, index) => (
                    <div key={index} className="horizontal-scroller-section">
                        <img 
                            src={image} 
                            alt={`Imagen ${index + 1}`} 
                            onLoad={handleImageProcessed}
                            onError={handleImageProcessed}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcuSeek;