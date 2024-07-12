import { loadFull } from "tsparticles";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState, useMemo } from "react";

const Particles1 = ({ id }) => { 
    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    const particlesLoaded = (container) => {
    };

    const options = useMemo(() => (
        {
            fullScreen: {
                enable: false,
            },
            interactivity: {
                events: {
                    onClick: {
                        enable: false,
                    },
                    onHover: {
                        enable: false,
                    },
                    resize: true,
                },
                modes: {
                    bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 0.8,
                        size: 40,
                    },
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#edfff2",
                },
                collisions: {
                    enable: false,
                },
                move: {
                    enable: true,
                    random: false,
                    speed: 3,
                    straight: false,
                    direction: "top",
                    out_mode: "enter",
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 600,
                },
                opacity: {
                    value: 1,
                },
                size: {
                    value: { min: 1, max: 3 },
                },
                shape: {
                    type: "polygon", // Forma de las partículas: "circle", "edge", "triangle", "polygon", "star", "image"
                },
                shadow: {
                    enable: true,
                    blur: 10,
                    color: {
                        value: "#fff",
                    },
                }
            },
            detectRetina: true,
        }
    ))

    return (
        <>
            {init && <Particles id={id} className='h-100' particlesLoaded={particlesLoaded} options={options} />}
        </>
    )
}
export default Particles1;