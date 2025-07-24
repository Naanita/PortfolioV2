// src/components/DayView.jsx

import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import EventModal from './EventModal';

// Recibe la nueva prop 'onClose'
const DayView = ({ date, events, onClose }) => {
    const [now, setNow] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const firstEventRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (firstEventRef.current) {
            firstEventRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [events, date]);

    const todayEvents = events
        .filter(e => e.fecha === format(date, 'yyyy-MM-dd'))
        .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

    const hours = Array.from({ length: 24 }, (_, i) => i);

    const calculatePosition = (time) => (parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]));

    return (
        <div className="position-relative">
            {/* --- BOTÓN DE CIERRE (X) --- */}
            <div className="d-flex justify-content-between align-items-center p-3 sticky-top bg-white border-bottom">
                <h3 className="h5 mb-0">{format(date, "eeee, dd 'de' MMMM", { locale: es })}</h3>
                {/* Llama a la función onClose que viene del padre */}
                <button className="btn btn-sm" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="position-relative" style={{ height: `${24 * 60}px` }}>
                {format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd') && (
                    <div className="position-absolute w-100 d-flex align-items-center" style={{ top: `${calculatePosition(format(now, 'HH:mm'))}px`, zIndex: 2 }}>
                        <div className="small me-1" style={{ color: 'var(--color-principalCalendar)' }}>{format(now, 'HH:mm')}</div>
                        <div className="w-100" style={{ height: '2px', backgroundColor: 'var(--color-principalCalendar)' }}></div>
                    </div>
                )}
                {hours.map(hour => (
                    <div key={hour} className="d-flex border-top" style={{ height: '60px' }}>
                        <div className="small text-muted p-1" style={{ width: '50px' }}>{`${hour}:00`}</div>
                        <div className="w-100 border-start"></div>
                    </div>
                ))}
                {todayEvents.map((event, index) => {
                    const top = calculatePosition(event.horaInicio);
                    const end = calculatePosition(event.horaFin);
                    const height = end - top;

                    return (
                        <div
                            ref={index === 0 ? firstEventRef : null}
                            key={event.id}
                            className="position-absolute rounded p-2 text-white small"
                            style={{
                                top: `${top}px`,
                                left: '60px',
                                right: '10px',
                                height: `${height}px`,
                                backgroundColor: 'var(--color-principalCalendar)',
                                zIndex: 1,
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedEvent(event)}
                        >
                            <p className="fw-bold mb-0">{event.titulo}</p>
                            <p className="mb-0">{event.horaInicio} - {event.horaFin}</p>
                        </div>
                    );
                })}
            </div>
            {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </div>
    );
};

export default DayView;