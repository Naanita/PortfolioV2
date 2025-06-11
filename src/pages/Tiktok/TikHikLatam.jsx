import React, { useState, useEffect, useRef } from 'react';
import videosData from './hikvisionlatam_tiktok_videos.json';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './tiktok.css';

const TikHikLatam = () => {
    const [videos, setVideos] = useState([]);
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        setVideos(videosData.slice(0, 1)); // Solo tomar el primer video
    }, []);

    const handleToggleMute = () => {
        setMuted((prev) => !prev);
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = muted;
        }
    }, [muted]);

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <h1 className="text-center mb-3">TikHikLatam</h1>
            <p className="text-center mb-4">Welcome to the TikHikLatam page!</p>
            <div className="w-100 d-flex justify-content-center">
                <Splide
                    options={{
                        type: 'slide',
                        perPage: 1,
                        arrows: true,
                        pagination: false,
                        autoplay: false,
                        height: 'auto',
                    }}
                    className="w-100"
                    style={{ maxWidth: 600 }}
                >
                    {videos.map((video, idx) => (
                        <SplideSlide key={idx}>
                            <div className="d-flex flex-column align-items-center text-center">
                                <div className='innerVideo'>
                                    <video
                                        ref={videoRef}
                                        src={video.local_filename}
                                        className="mb-3"
                                        muted={muted}
                                        playsInline
                                    />
                                    <div className='contentBottom'>
                                        <div />
                                        <div />
                                        <div />
                                        <div />
                                        <div />
                                        <div />
                                        {/* Contenido real */}
                                        <div className='head'>
                                            <p className='text-suspensory-2lines'>{video.description}</p>
                                        </div>
                                        <button
                                            className="btn btn-secondary mt-2"
                                            onClick={handleToggleMute}
                                            style={{ pointerEvents: 'auto' }}
                                        >
                                            {muted ? 'Activar Volumen' : 'Silenciar'}
                                        </button>
                                    </div>
                                </div>
                                <div>Hashtags: {video.hashtags?.join(' ')}</div>
                                <div>
                                    Likes: {video.likes} | Comments: {video.comments} | Shares: {video.shares} | Views: {video.views}
                                </div>
                                <div>Date: {video.date}</div>
                                <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">
                                    Ver en TikTok
                                </a>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};

export default TikHikLatam;
