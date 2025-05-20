import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import img1 from "../../assets/img/smb/home/1.png";
import img2 from "../../assets/img/smb/home/2.png";
import img3 from "../../assets/img/smb/home/3.png";
import img4 from "../../assets/img/smb/home/4.png";

gsap.registerPlugin(Draggable);

const pinsData = [
    { id: "pin1", x: 400, y: 300, label: "Café" },
    { id: "pin2", x: 1000, y: 600, label: "Oficina" },
];

const TilemapGrid = () => {
    const containerRef = useRef(null);
    const pinRefs = useRef({});
    const [activeCard, setActiveCard] = useState(null);
    const [hiddenPins, setHiddenPins] = useState([]);

    const images = [img1, img2, img3, img4];

    useEffect(() => {
        const draggable = Draggable.create(containerRef.current, {
            type: "x,y",
            inertia: true,
            edgeResistance: 0.65,
            cursor: "grab",
            activeCursor: "grabbing",
            onDrag: checkOffscreenPins,
            onDragEnd: checkOffscreenPins,
        })[0];

        checkOffscreenPins();

        window.addEventListener("resize", checkOffscreenPins);
        return () => {
            draggable.kill();
            window.removeEventListener("resize", checkOffscreenPins);
        };
    }, []);

    const focusOnPin = (pinId) => {
        const pin = pinRefs.current[pinId];
        if (!pin || !containerRef.current) return;

        const pinRect = pin.getBoundingClientRect();
        const containerRect = containerRef.current.parentNode.getBoundingClientRect();

        const offsetX = pinRect.left - containerRect.width / 2 + pinRect.width / 2;
        const offsetY = pinRect.top - containerRect.height / 2 + pinRect.height / 2;

        gsap.to(containerRef.current, {
            x: `-=${offsetX}`,
            y: `-=${offsetY}`,
            duration: 0.8,
            ease: "power3.out",
            onComplete: checkOffscreenPins,
        });
    };

    const checkOffscreenPins = () => {
        const hidden = [];

        Object.entries(pinRefs.current).forEach(([id, pin]) => {
            const rect = pin.getBoundingClientRect();
            if (
                rect.right < 0 ||
                rect.bottom < 0 ||
                rect.left > window.innerWidth ||
                rect.top > window.innerHeight
            ) {
                hidden.push(id);
            }
        });

        setHiddenPins(hidden);
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                position: "relative",
                userSelect: "none",
            }}
        >
            <div
                ref={containerRef}
                style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto",
                    gridAutoRows: "auto",
                    gap: "0px",
                    position: "absolute",
                }}
            >
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Tile ${index + 1}`}
                        style={{
                            display: "block",
                            objectFit: "none",
                            imageRendering: "pixelated",
                            userSelect: "none",
                            pointerEvents: "none",
                            width: "auto",
                            height: "auto",
                        }}
                        draggable={false}
                    />
                ))}

                {/* Pins principales */}
                {pinsData.map((pin) => (
                    <div
                        key={pin.id}
                        ref={(el) => (pinRefs.current[pin.id] = el)}
                        onClick={() => {
                            setActiveCard(pin.id);
                            focusOnPin(pin.id);
                        }}
                        style={{
                            position: "absolute",
                            top: `${pin.y}px`,
                            left: `${pin.x}px`,
                            transform: "translate(-50%, -100%)",
                            width: "3vw",
                            height: "3vw",
                            minWidth: "20px",
                            minHeight: "20px",
                            maxWidth: "50px",
                            maxHeight: "50px",
                            backgroundColor: "purple",
                            borderRadius: "50%",
                            zIndex: 3,
                            cursor: "pointer",
                        }}
                    />
                ))}

                {/* Card flotante */}
                {pinsData.map((pin) =>
                    activeCard === pin.id ? (
                        <div
                            key={`card-${pin.id}`}
                            style={{
                                position: "absolute",
                                top: `${pin.y - 80}px`,
                                left: `${pin.x}px`,
                                transform: "translate(-50%, -100%)",
                                background: "white",
                                padding: "1rem",
                                borderRadius: "10px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                zIndex: 5,
                            }}
                        >
                            <strong>{pin.label}</strong>
                            <button
                                style={{ marginLeft: 10 }}
                                onClick={() => setActiveCard(null)}
                            >
                                Cerrar
                            </button>
                        </div>
                    ) : null
                )}
            </div>

            {/* Indicadores flotantes dinámicos */}
            {hiddenPins.map((pinId) => {
                const pin = pinRefs.current[pinId];
                if (!pin) return null;

                const rect = pin.getBoundingClientRect();
                const positionStyle = { position: "fixed", zIndex: 9999 };

                // Horizontal
                if (rect.left < 0) {
                    positionStyle.left = 0;
                    positionStyle.top = rect.top + rect.height / 2;
                    positionStyle.transform = "translateY(-50%)";
                } else if (rect.right > window.innerWidth) {
                    positionStyle.right = 0;
                    positionStyle.top = rect.top + rect.height / 2;
                    positionStyle.transform = "translateY(-50%)";
                }

                // Vertical
                if (rect.top < 0) {
                    positionStyle.top = 0;
                    positionStyle.left = rect.left + rect.width / 2;
                    positionStyle.transform = "translateX(-50%)";
                } else if (rect.bottom > window.innerHeight) {
                    positionStyle.bottom = 0;
                    positionStyle.left = rect.left + rect.width / 2;
                    positionStyle.transform = "translateX(-50%)";
                }

                return (
                    <div
                        key={`floating-${pinId}`}
                        onClick={() => {
                            setActiveCard(pinId);
                            focusOnPin(pinId);
                        }}
                        style={{
                            ...positionStyle,
                            width: 20,
                            height: 20,
                            backgroundColor: "purple",
                            borderRadius: "50%",
                            cursor: "pointer",
                            border: "2px solid white",
                            boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                        }}
                    />
                );
            })}
        </div>
    );
};

export default TilemapGrid;
