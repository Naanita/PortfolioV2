import { useState, useEffect, useRef } from 'react';
import videosData from './hikvisionlatam_tiktok_videos.json';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "../tiktok.css";
import { Helmet } from "react-helmet";

const TikHikLatam = () => {
    const [videos, setVideos] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const videoRefs = useRef([]);
    const [mutedStates, setMutedStates] = useState({});
    const [playingStates, setPlayingStates] = useState({});
    const [hoveredIndex, setHoveredIndex] = useState(null);


    useEffect(() => {
        setVideos([...videosData]);
    }, []);

    useEffect(() => {
        if (videos.length > 0) {
            const initialMuted = {};
            const initialPlaying = {};
            videos.forEach((_, idx) => {
                initialMuted[idx] = true;
                initialPlaying[idx] = false;
            });
            setMutedStates(initialMuted);
            setPlayingStates(initialPlaying);
        }
    }, [videos]);

    useEffect(() => {
        videoRefs.current.forEach((video, idx) => {
            if (video) {
                video.muted = mutedStates[idx] !== false;
                if (playingStates[idx]) {
                    video.play().catch(error => {
                        console.error("Error al intentar reproducir el video:", error);
                    });
                } else {
                    video.pause();
                }
            }
        });
    }, [mutedStates, playingStates, activeIndex, videos]);

    // Función para enviar eventos a Google Analytics
    const sendTikTokEvent = (action, video) => {
        if (window.gtag) {
            window.gtag('event', action, {
                event_category: 'Tiktok',
                event_label: video.description,
                value: video.url
            });
        }
    };

    const handleToggleMute = (idx) => {
        setMutedStates((prev) => ({
            ...prev,
            [idx]: !prev[idx],
        }));
        sendTikTokEvent('toggle_mute', videos[idx]);
    };

    const handlePlayPause = (idx) => {
        setPlayingStates((prev) => {
            const newStates = {};
            Object.keys(prev).forEach((key) => {
                newStates[key] = Number(key) === idx ? !prev[idx] : false;
            });
            return newStates;
        });
        setActiveIndex(idx);
        setMutedStates((prev) => ({
            ...prev,
            [idx]: playingStates[idx] ? true : false,
        }));
        sendTikTokEvent('play_pause', videos[idx]);
    };

    const handleVideoEnded = (idx) => {
        setPlayingStates((prev) => ({
            ...prev,
            [idx]: false,
        }));
        setMutedStates((prev) => ({
            ...prev,
            [idx]: true,
        }));
    };
    
    const handleVideoClick = (idx) => {
        setHoveredIndex(idx);
        setTimeout(() => setHoveredIndex(null), 2000);
    };

    const formatNumber = (num) => {
        if (num >= 1_000_000) return `+${(num / 1_000_000).toFixed(1)}M`;
        if (num >= 1_000) return `+${(num / 1_000).toFixed(1)}k`;
        return num;
    };

    return (
        <>
            <Helmet>
                <title>HikvisionlatamTiktok</title>
                <meta name="description" content="Videos destacados de TikTok de Hikvisionlatam. Mira, reproduce y descubre los videos más populares y recientes de la cuenta oficial de Hikvisionlatam en TikTok." />
            </Helmet>
            <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
                <div className="w-100 d-flex justify-content-center">
                    <Splide
                        options={{
                            type: 'slide',
                            perPage: 4,
                            focus: 'center',
                            gap: '1rem',
                            padding: { left: '0px', right: '10%' },
                            arrows: true,
                            pagination: false,
                            autoplay: false,
                            height: 'auto',
                            dragMinThreshold: { mouse: 120, touch: 80 },
                            speed: 600,
                            flickPower: 100,
                            flickMaxPages: 1,
                            breakpoints: {
                                1200: { perPage: 3 },
                                768: { perPage: 1 }
                            }
                        }}
                        onMoved={(_, newIndex) => setActiveIndex(newIndex)}
                        className="w-100"
                        style={{ maxWidth: 1200 }}
                    >
                        {videos.filter(video => video.video_url).map((video, idx) => (
                            <SplideSlide key={idx}>
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-flex flex-column align-items-center text-center video-container"
                                    style={{ transition: 'transform 0.4s', textDecoration: 'none', color: 'inherit' }}
                                    tabIndex={-1}   
                                    aria-label={`Ver video de ${video.description} en TikTok. Vistas: ${formatNumber(video.views)}, Comentarios: ${formatNumber(video.comments)}`}
                                    title={`Ver video de ${video.description} en TikTok`}
                                    onClick={() => sendTikTokEvent('click_video_link', video)}
                                >
                                    <div
                                        className='innerVideo'
                                        onMouseEnter={() => setHoveredIndex(idx)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <video
                                            ref={el => (videoRefs.current[idx] = el)}
                                            src={video.video_url}
                                            poster={video.thumbnail_url} 
                                            loading={idx < 4 ? "eager" : "lazy"}
                                            muted={mutedStates[idx] !== false}
                                            playsInline
                                            controls={false}
                                            onEnded={() => handleVideoEnded(idx)}
                                            onClick={() => handleVideoClick(idx)}
                                        />
                                        <button
                                            className={`btn btn-playpause-overlay${(hoveredIndex === idx) ? ' visible' : ''}`}
                                            onMouseUp={e => e.currentTarget.blur()}
                                            onClick={e => { e.preventDefault(); handlePlayPause(idx); }}
                                            type="button"
                                            aria-label={playingStates[idx] ? 'Pausar video' : 'Reproducir video'}
                                        >
                                            <i className={`fa-solid ${playingStates[idx] ? 'fa-pause' : 'fa-play'}`}></i>
                                        </button>
                                        <div className='contentBottom'>
                                            <div />
                                            <div />
                                            <div />
                                            <div className='head'>
                                                <div className='d-flex align-items-center'>
                                                    <h1 className='fs-6 text-white me-1 my-0'>Hikvisionlatam</h1>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#42A5F5" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                                    </svg>
                                                </div>
                                                <p className='text-suspensory-2lines col'>{video.description}</p>
                                                <div className='row mt-1'>
                                                    <div className='col-4 d-flex flex-column justify-content-center align-items-center'>
                                                        <i className="fa-solid fa-eye" aria-hidden="true"></i> 
                                                        <p className='fw-bold' aria-label={`${formatNumber(video.views)} vistas`}>{formatNumber(video.views)}</p>
                                                    </div>
                                                    <div className='col-4 border-start border-end border-1 border-white d-flex flex-column justify-content-center align-items-center'>
                                                        <i className="fa-solid fa-comment" aria-hidden="true"></i>
                                                        <p className='fw-bold' aria-label={`${formatNumber(video.comments)} comentarios`}>{formatNumber(video.comments)}</p>
                                                    </div>
                                                    <div className='col-4 d-flex flex-column justify-content-center align-items-center'>
                                                        <i className="fa-solid fa-heart" aria-hidden="true"></i> 
                                                        <p className='fw-bold' aria-label={`${formatNumber(video.likes)} me gusta`}>{formatNumber(video.likes)}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center botones-tiktok">
                                                    <button
                                                        className="btn btn-white btn-ver-tiktok"
                                                        style={{ color: 'black' }}
                                                        onClick={e => { 
                                                            e.preventDefault(); 
                                                            sendTikTokEvent('click_ver_en_tiktok', video);
                                                            window.open(video.url, '_blank'); 
                                                        }}
                                                    >
                                                        Ver en TikTok
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary btn-mute"
                                                        onClick={e => { 
                                                            e.preventDefault(); 
                                                            handleToggleMute(idx); 
                                                        }}
                                                        aria-label={mutedStates[idx] !== false ? "Activar sonido del video" : "Silenciar video"}
                                                    >
                                                        <i className={mutedStates[idx] !== false ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>
            </div>
        </>
    );
};

export default TikHikLatam;