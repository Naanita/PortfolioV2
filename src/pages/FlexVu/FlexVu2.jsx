import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import "./flexvu2.css"; // Import your CSS file for styles


gsap.registerPlugin(Draggable);

const totalImages = 24;
const images = Array.from({ length: totalImages }, (_, i) => 
    `https://pub-af8c7269060645a3af22294a08e89478.r2.dev/${i + 1}.jpg`
);

const FlexVu2 = () => {
    const [showOverlay, setShowOverlay] = useState(true);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

const handleOverlayClick = () => {

  // Google Analytics (solo funcionará si no está embebido)
  if (typeof window.gtag === "function") {
    window.gtag("event", "clic_inicio_exploracion", {
      event_category: "Interacción",
      event_label: "Overlay Flexvu",
      value: 1
    });
  }

  // 🔁 Enviar evento al sitio padre vía postMessage
  window.parent.postMessage({
    type: "analytics-event",
    event: "clic_inicio_exploracion",
    category: "Interacción",
    label: "Overlay Flexvu",
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
            onPress: () => {
                if (typeof window.gtag === "function") {
                window.gtag("event", "inicio_grabbing", {
                    event_category: "Interacción",
                    event_label: "Scroll horizontal Flexvu",
                    value: 1,
                });
                }
                    window.parent.postMessage({
                    type: "analytics-event",
                    event: "inicio_grabbing",
                    category: "Interacción",
                    label: "Scroll horizontal Flexvu",
                    value: 1
                }, "*");
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
            <div ref={contentRef} className="content-horizontal-scroller-flexvu" >
                {images.map((image, index) => (
                    <div key={index} className="section-horizontal-scroller-flexvu" >
                        <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlexVu2;
