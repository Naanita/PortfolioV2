import React, { useState, useEffect, useRef } from 'react';
import videosData from './hikvisionlatam_tiktok_videos.json';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './tiktok.css';

const TikHikLatam = () => {
    const [videos, setVideos] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [playingStates, setPlayingStates] = useState([]);
    const [mutedStates, setMutedStates] = useState([]);
    const videoRefs = useRef([]);

    useEffect(() => {
        // Cargar los datos de los videos desde el archivo JSON
        const fetchData = async () => {
            setVideos(videosData);
        };

        fetchData();
    }, []);

    const handleVideoClick = (index) => {
        const newPlayingStates = Array(videos.length).fill(false);
        newPlayingStates[index] = !playingStates[index];
        setPlayingStates(newPlayingStates);

        if (newPlayingStates[index]) {
            videoRefs.current[index].play();
        } else {
            videoRefs.current[index].pause();
        }
    };

    const handleVideoEnded = (index) => {
        const newPlayingStates = [...playingStates];
        newPlayingStates[index] = false;
        setPlayingStates(newPlayingStates);
    };

    const handlePlayPause = (index) => {
        const newPlayingStates = [...playingStates];
        newPlayingStates[index] = !newPlayingStates[index];
        setPlayingStates(newPlayingStates);

        if (newPlayingStates[index]) {
            videoRefs.current[index].play();
        } else {
            videoRefs.current[index].pause();
        }
    };

    const handleToggleMute = (index) => {
        const newMutedStates = [...mutedStates];
        newMutedStates[index] = !newMutedStates[index];
        setMutedStates(newMutedStates);
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <section
            className="container d-flex flex-column align-items-center justify-content-center min-vh-100"
            aria-label="Videos populares de Hikvision Latam en TikTok"
        >
            <header className="mb-4 text-center">
                <h1 className="display-5 fw-bold" style={{ color: '#42A5F5' }}>
                    Videos Destacados de Hikvision Latam en TikTok
                </h1>
                <p className="lead">
                    Descubre los videos más populares, vistos y comentados de nuestra cuenta oficial de TikTok. ¡Explora tendencias, innovaciones y más!
                </p>
            </header>
            <div className="w-100 d-flex justify-content-center">
                <Splide
                    options={{
                        type       : 'loop',
                        perPage    : 3,
                        perMove    : 1,
                        autoplay   : true,
                        interval   : 3000,
                        pauseOnHover: false,
                        arrows     : true,
                        pagination : false,
                        breakpoints : {
                            640: {
                                perPage: 1,
                            },
                            1024: {
                                perPage: 2,
                            },
                        },
                    }}
                >
                    {videos.filter(video => video.local_filename).map((video, idx) => (
                        <SplideSlide key={idx}>
                            <article
                                className="d-flex flex-column align-items-center text-center video-container"
                                style={{ transition: 'transform 0.4s', textDecoration: 'none', color: 'inherit' }}
                                tabIndex={-1}
                                aria-label={`Video de TikTok: ${video.description}`}
                            >
                                <div
                                    className='innerVideo'
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <video
                                        ref={el => (videoRefs.current[idx] = el)}
                                        src={video.local_filename}
                                        muted={mutedStates[idx] !== false}
                                        playsInline
                                        controls={false}
                                        onEnded={() => handleVideoEnded(idx)}
                                        onClick={() => handleVideoClick(idx)}
                                        poster={video.thumbnail || undefined}
                                        title={video.description}
                                        aria-label={video.description}
                                    />
                                    {/* Botón Play/Pause centrado y visible solo en hover */}
                                    <button
                                        className={`btn btn-playpause-overlay${(hoveredIndex === idx) ? ' visible' : ''}`}
                                        onMouseUp={e => e.currentTarget.blur()}
                                        onClick={e => { e.preventDefault(); handlePlayPause(idx); }}
                                        tabIndex={-1}
                                        type="button"
                                        aria-label={playingStates[idx] ? "Pausar video" : "Reproducir video"}
                                        title={playingStates[idx] ? "Pausar video" : "Reproducir video"}
                                    >
                                        <i className={`fa-solid ${playingStates[idx] ? 'fa-pause' : 'fa-play'}`}></i>
                                    </button>
                                    <div className='contentBottom'>
                                        <div />
                                        <div />
                                        <div />
                                        <div className='head'>
                                            <div className='d-flex align-items-center'>
                                                <h2 className='fs-6 text-white me-1 my-0' style={{ fontWeight: 700 }}>
                                                    Hikvisionlatam
                                                </h2>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#42A5F5" className="bi bi-patch-check-fill" viewBox="0 0 16 16" aria-label="Cuenta verificada">
                                                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                                </svg>
                                            </div>
                                            <p className='text-suspensory-2lines col' title={video.description}>{video.description}</p>
                                            <div className='row mt-1' aria-label="Estadísticas del video">
                                                <div className='col-4 d-flex flex-column justify-content-center align-items-center'>
                                                    <i className="fa-solid fa-eye" aria-label="Vistas"></i>
                                                    <p className='fw-bold'>{formatNumber(video.views)}</p>
                                                </div>
                                                <div className='col-4 border-start border-end border-1 border-white d-flex flex-column justify-content-center align-items-center'>
                                                    <i className="fa-solid fa-comment" aria-label="Comentarios"></i>
                                                    <p className='fw-bold'>{formatNumber(video.comments)}</p>
                                                </div>
                                                <div className='col-4 d-flex flex-column justify-content-center align-items-center'>
                                                    <i className="fa-solid fa-heart" aria-label="Me gusta"></i>
                                                    <p className='fw-bold'>{formatNumber(video.likes)}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center botones-tiktok">
                                                <a
                                                    className="btn btn-white btn-ver-tiktok"
                                                    style={{ color: 'black' }}
                                                    href={video.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="Ver video en TikTok"
                                                    aria-label="Ver video en TikTok"
                                                >
                                                    Ver en TikTok
                                                </a>
                                                <button
                                                    className="btn btn-secondary btn-mute"
                                                    onClick={e => { e.preventDefault(); handleToggleMute(idx); }}
                                                    aria-label={mutedStates[idx] !== false ? "Activar sonido" : "Silenciar video"}
                                                    title={mutedStates[idx] !== false ? "Activar sonido" : "Silenciar video"}
                                                >
                                                    <i className={mutedStates[idx] !== false ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"}></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </section>
    );
};

export default TikHikLatam;