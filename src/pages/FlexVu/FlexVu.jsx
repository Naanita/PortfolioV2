import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoSrc from '../../assets/videos/video.mp4';
import '../FlexVu/flexvu.css'; // Import your CSS file for styles

gsap.registerPlugin(ScrollTrigger);

const FlexVu = () => {
    const containerRef = useRef(null);
    const [frames, setFrames] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading overlay
    const totalFrames = 100; // Number of frames to extract

    useEffect(() => {
        // Disable scrolling while loading
        document.body.style.overflow = 'hidden';

        const video = document.createElement('video');
        video.src = videoSrc;
        video.crossOrigin = 'anonymous';

        const extractFrames = async () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const loadedFrames = [];

            video.addEventListener('loadeddata', async () => {
                const frameInterval = video.duration / (totalFrames - 1);

                // Ajustar la altura del contenedor dinámicamente
                const containerHeight = video.duration * 1000; // 1000px por segundo
                containerRef.current.style.height = `${containerHeight}px`;

                for (let i = 0; i < totalFrames; i++) {
                    video.currentTime = i * frameInterval;

                    await new Promise((resolve) => {
                        video.addEventListener('seeked', () => {
                            canvas.width = video.videoWidth;
                            canvas.height = video.videoHeight;
                            context.drawImage(video, 0, 0, canvas.width, canvas.height);
                            const frameData = canvas.toDataURL('image/jpeg');
                            loadedFrames.push(frameData);
                            resolve();
                        }, { once: true });
                    });
                }

                setFrames(loadedFrames);
                setLoading(false); // Hide loading overlay once frames are loaded
                document.body.style.overflow = ''; // Re-enable scrolling
            });
        };

        extractFrames();

        // Scroll-triggered frame animation
        gsap.to(containerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.5,
                markers: true,
                onUpdate: (self) => {
                    const frameIndex = Math.floor(self.progress * (totalFrames - 1));
                    console.log(`Current frame: ${frameIndex}`);

                    // Define custom frame ranges for each frametext
                    const frameRanges = [
                        { start: 0, end: 30 },  // frametext1: frames 0–30
                        { start: 31, end: 66 }, // frametext2: frames 31–59
                        { start: 67, end: totalFrames - 1 }, // frametext3: frames 60–99
                    ];

                    // Manage visibility and animation of frametext elements
                    const textElements = document.querySelectorAll('.frame-text');
                    textElements.forEach((textElement, index) => {
                        const range = frameRanges[index];
                        if (frameIndex >= range.start && frameIndex <= range.end) {
                            textElement.style.display = 'block';

                            if (index === frameRanges.length - 1) {
                                // Last frametext: appear immediately
                                gsap.set(textElement, {
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    y: 0,
                                });
                            } else {
                                // Other frametexts: gradual appearance
                                const adjustedEnd = range.start + (range.end - range.start) * 0.35;
                                const progress = Math.min(1, (frameIndex - range.start) / (adjustedEnd - range.start));

                                gsap.set(textElement, {
                                    opacity: progress,
                                    filter: `blur(${10 * (1 - progress)}px)`, // Reduce blur as progress increases
                                    y: 50 * (1 - progress), // Move up as progress increases
                                });
                            }
                        } else {
                            textElement.style.display = 'none';
                        }
                    });

                    const images = document.querySelectorAll('.frame-image');
                    images.forEach((img, index) => {
                        img.style.display = index === frameIndex ? 'block' : 'none';
                    });
                },
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            document.body.style.overflow = ''; // Ensure scrolling is re-enabled on cleanup
        };
    }, []);

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner-flexvu"></div>
                </div>
            )}
            <section ref={containerRef} className='container-fluid' style={{ height: '200vh', background: '#111' }}>
                <div className='bacground-flexvu-gradient'>
                    <div className='content-flexvu'>
                        <div className='text-flexvu'>
                            <div className='int'>
                                <div className='frame-text frametext1' style={{ display: 'none', opacity: 0 }}>
                                    <h1 className='text-white'>
                                        ¡Cobertura Panorámica con Giro Horizontal de Precisión!
                                    </h1>
                                </div>
                                <div className='frame-text frametext2' style={{ display: 'none', opacity: 0 }}>
                                    <h1 className='text-white'>
                                        ¡Control Multinivel con Giro Vertical Inteligente!
                                    </h1>
                                </div>
                                <div className='frame-text frametext3' style={{ display: 'none', opacity: 0 }}>
                                    <h1 className='text-white'>
                                        ¡Visión activa incluso en oscuridad absoluta!
                                    </h1>
                                    <a href="https://www.hikvision.com/es-la/products/IP-Products/Network-Cameras/pt-cameras/"  target="_blank" rel="noopener noreferrer" className='flexvu-button'>
                                        Descubre más
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ position: 'fixed', top: '57%', left: '37%', transform: 'translate(-50%, -50%)' }}>
                    {frames.map((frame, index) => (
                        <img
                            key={index}
                            src={frame}
                            alt={`Frame ${index}`}
                            className="frame-image"
                            style={{
                                display: index === 0 ? 'block' : 'none',
                                height: 'auto',
                            }}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default FlexVu;
