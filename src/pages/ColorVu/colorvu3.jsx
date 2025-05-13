import { useRef, useState, useEffect } from "react";
import beforeImg from "../../assets/img/colorvu/before.png";
import afterImg from "../../assets/img/colorvu/after.png";
import "./colorvu3.css";

const ColorVu3 = () => {
    const containerRef = useRef(null);
    const [position, setPosition] = useState(0.5);
    const [dragging, setDragging] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);

    // Actualizar dimensiones del contenedor al montar y en resize
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
                setContainerHeight(containerRef.current.offsetHeight);
            }
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Manejar el movimiento del slider
    useEffect(() => {
        if (!dragging) return;

        const move = (e) => {
            const rect = containerRef.current.getBoundingClientRect();
            let clientX = e.touches?.[0].clientX ?? e.clientX;
            let x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            setPosition(x / rect.width);
        };

        const stop = () => setDragging(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("touchmove", move);
        window.addEventListener("mouseup", stop);
        window.addEventListener("touchend", stop);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("touchmove", move);
            window.removeEventListener("mouseup", stop);
            window.removeEventListener("touchend", stop);
        };
    }, [dragging]);

    return (
        <div
            ref={containerRef}
            className="img-comp-container"
        >
            {/* Imagen base */}
            <img
                src={afterImg}
                alt="Cámara tradicional"
                className="img-comp-base"
                draggable={false}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                    pointerEvents: "none"
                }}
            />

            {/* Overlay con imagen before */}
            <div
                className="img-comp-overlay"
                style={{
                    width: `${position * 100}%`,
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    pointerEvents: "none"
                }}
            >
                <img
                    src={beforeImg}
                    alt="Cámara ColorVu 3.0"
                    draggable={false}
                    style={{
                        width: `${containerWidth}px`,
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        position: "absolute",
                        left: 0,
                        top: 0
                    }}
                />
            </div>

            {/* Slider */}
            <div
                className="img-comp-slider"
                style={{
                    left: `calc(${position * 100}% - 30px)`,
                    top: "calc(50% - 30px)"
                }}
                onMouseDown={() => setDragging(true)}
                onTouchStart={() => setDragging(true)}
            >
                <i className="fa-solid fa-arrows-up-down"></i>
            </div>
        </div>
    );
};

export default ColorVu3;
