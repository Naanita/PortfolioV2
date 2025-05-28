import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import img1 from "../../assets/img/smb/home/1.png";
import img2 from "../../assets/img/smb/home/2.png";
import img3 from "../../assets/img/smb/home/3.png";
import img4 from "../../assets/img/smb/home/4.png";
import AT from "../../assets/img/mapImages/K1T323.png";
import CT from "../../assets/img/mapImages/DS-2CE78.png";
import '../SMB/exploreScenario.css';


gsap.registerPlugin(Draggable);

const pinsData = [
    {
        id: "pin1",
        x: 2290,
        y: 630,
        name: "Terminal de reconocimiento facial",
        model: "Serie DS-K1T323",
        icon: "fa-solid fa-door-closed",
        img: AT,
        descriptionList: [
            "Pantalla de 2,4 pulgadas, objetivo gran angular de 2 megapíxeles",
            "Capacidad para 1.000 caras y 3.000 tarjetas",
            "DAdmite autenticación por cara, tarjeta y código QR",
            "Audio bidireccional con software cliente, estación interior y estación principal.",
            "Admite modo AP. Admite Web móvil y Web de PC para configuración",
            "Admite alimentación por 12 V CC o PoE y admite alimentación para dispositivo y cerradura de puerta",
            "Admite tarjeta EM",
            "Admite WDR",
        ],


    },
    {
        id: "pin2",
        x: 1480,
        y: 38,
        name: "Cámara Turbo HD",
        model: "DS-2CE78D0T-LXTS",
        icon: "fa-solid fa-camera",
        img: CT,
        descriptionList: [
            "Imágenes de alta calidad con 2 MP, resolución 1920 × 1080",
            "Lente focal fija de 2,8 mm, 3,6 mm",
            "Hasta 40 m de distancia IR para imágenes nocturnas brillantes",
            "Hasta 40 m de distancia de luz blanca para imágenes nocturnas brillantes",
            "Luz híbrida inteligente, optimice su seguridad con opciones de iluminación flexibles",
            "Luz estroboscópica activa y alarma sonora",
            "Audio de alta calidad con audio a través de cable coaxial, micrófono integrado y altavoz integrado",
            "Proporcione comunicación en tiempo real mediante audio bidireccional integrado",
            "Resistente al agua y al polvo (IP67)",
        ],

    }
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


        const targetX = window.innerWidth * 0.30;
        const targetY = window.innerHeight / 2;

        const offsetX = pinRect.left - targetX + pinRect.width / 2;
        const offsetY = pinRect.top - targetY + pinRect.height / 2;

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
        <div className="containerTileMap">
            {/* Card flotante */}
            {pinsData.map((pin) =>
                activeCard === pin.id ? (
                    <div key={`card-${pin.id}`} className="floatingCard">
                        <div className="floatingCardHeader">
                            <div className="d-flex align-items-center">
                                <i className={`${pin.icon} me-2 text-danger`}></i>
                                <div>
                                    <h1 className="m-0 fs-3">{pin.name}</h1>
                                    <p className="m-0">{pin.model}</p>
                                </div>
                            </div>
                            <a onClick={() => setActiveCard(null)} className="btn">
                                <i className="fa-solid fa-xmark fs-4"></i>
                            </a>
                        </div>
                        <div className="floatingCardBody">
                            <div className="floatingImgCard mb-3">
                                <img src={pin.img} alt={`${pin.name}, ${pin.model}`} />
                            </div>
                            <ul className="mb-5">
                                {pin.descriptionList.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                            <div className="accordion p-1" id="InstallationMaterials">
                                <div className="accordion-item p-2">
                                    <h2 className="accordion-header border-0">
                                        <button className="StoreAccordion accordion-button fs-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Materiales de instalación
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse text-dark border-0" data-bs-parent="#InstallationMaterials">
                                        <div className="accordion-body store-paddingCard border-0">
                                            <div className="contentDownloadCard">
                                                <div>
                                                    <p className="m-0">Quick Start Guide</p>
                                                    <p className="m-0">17Kb</p>
                                                </div>
                                                <a href="">
                                                    <i className="fa-solid fa-download fsw-10"></i>
                                                </a>
                                            </div>
                                            <div className="contentDownloadCard">
                                                <div>
                                                    <p className="m-0">Quick Start Guide</p>
                                                    <p className="m-0">17Kb</p>
                                                </div>
                                                <a href="">
                                                    <i className="fa-solid fa-download fsw-10"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion p-1" id="Configuration">
                                <div className="accordion-item p-2">
                                    <h2 className="accordion-header">
                                        <button className="StoreAccordion accordion-button fs-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            Configuración
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse text-dark border-0" data-bs-parent="#Configuration">
                                        <div className="accordion-body store-paddingCard border-0">
                                            <div className="contentDownloadCard">
                                                <div>
                                                    <p className="m-0">Quick Start Guide</p>
                                                    <p className="m-0">17Kb</p>
                                                </div>
                                                <a href="">
                                                    <i className="fa-solid fa-download fsw-10"></i>
                                                </a>
                                            </div>
                                            <div className="contentDownloadCard">
                                                <div>
                                                    <p className="m-0">Quick Start Guide</p>
                                                    <p className="m-0">17Kb</p>
                                                </div>
                                                <a href="">
                                                    <i className="fa-solid fa-download fsw-10"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cardFooter">
                                <a href="#" className="btn bgHik me-1"> Contacto de ventas</a>
                                <a href="" className="btn btn-outline-dark">Más Información</a>
                        </div>
                    </div>
                ) : null
            )}
            <div
                ref={containerRef}
                className="containerGridImg"
                onClick={(e) => {
                    console.log("Coordenadas absolutas en la ventana:");
                    console.log("clientX:", e.clientX, "clientY:", e.clientY);

                    // Si quieres la posición relativa al contenedor:
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    console.log("Coordenadas relativas al contenedor:", x, y);
                }}
            >
                {images.map((src, index) => (
                    <img key={index} src={src} alt={`Tile ${index + 1}`} draggable={false} />
                ))}
                {/* Pins principales */}
                {pinsData.map((pin) => (
                    <div key={pin.id} ref={(el) => (pinRefs.current[pin.id] = el)} onClick={() => { setActiveCard(pin.id); focusOnPin(pin.id); }} className="principalPin" style={{ top: `${pin.y}px`, left: `${pin.x}px`, }} >
                        <i className={pin.icon}></i>
                    </div>
                ))}
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
                    <div key={`floating-${pinId}`}
                        onClick={() => {
                            setActiveCard(pinId);
                            focusOnPin(pinId);
                        }}
                        className="SecondaryPin"
                        style={{
                            ...positionStyle,
                        }}
                    >
                        <i className={pinsData.find(p => p.id === pinId).icon}></i>
                    </div>
                    
                );
            })}
        </div>
    );
};

export default TilemapGrid;
