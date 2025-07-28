// src/components/DayView.jsx

import { useState, useEffect, useMemo, useRef } from 'react';
import { format, getMonth, getDate } from 'date-fns';
import { es } from 'date-fns/locale';
import EventModal from './EventModal';
import { eventColorMap } from './Calendar';

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
            firstEventRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [date]);

    const monthMapping = {
        'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
        'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
    };

    const todayEvents = useMemo(() => events
        .filter(e => {
            // --- AJUSTE CLAVE ---
            // Se asegura que el evento tenga mes y día, y se normaliza el nombre del mes.
            if (!e.mes || !e.dia) return false;
            const capitalizedMonth = e.mes.charAt(0).toUpperCase() + e.mes.slice(1).toLowerCase();
            const eventMonth = monthMapping[capitalizedMonth];
            const eventDay = parseInt(e.dia, 10);
            
            // Compara la fecha del evento con la fecha seleccionada en la vista.
            return eventMonth !== undefined && getMonth(date) === eventMonth && getDate(date) === eventDay;
        })
        .sort((a, b) => (a.hora_inicio || '').localeCompare(b.hora_inicio || '')),
    [date, events]);

    const calculatePosition = (time) => {
        if (typeof time !== 'string') return 0;
        const [hour, minute] = time.split(':').map(Number);
        return hour * 60 + (minute || 0);
    };
    
    const processedEvents = useMemo(() => {
        const groups = {};
        todayEvents.forEach(event => {
            if (!event.hora_inicio) return;
            const topPosition = calculatePosition(event.hora_inicio);
            const key = `pos-${topPosition}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(event);
        });

        const layoutEvents = [];
        Object.values(groups).forEach(group => {
            group.sort((a, b) => calculatePosition(a.hora_fin) - calculatePosition(b.hora_fin));
            const groupSize = group.length;
            const widthPercent = 100 / groupSize;

            group.forEach((event, index) => {
                const top = calculatePosition(event.hora_inicio);
                const end = calculatePosition(event.hora_fin);
                const height = Math.max(end - top, 30);

                layoutEvents.push({
                    ...event, top, height,
                    width: `calc(${widthPercent}% - 5px)`,
                    left: `${index * widthPercent}%`,
                    backgroundColor: eventColorMap[event.tipo_evento] || eventColorMap.default,
                });
            });
        });

        return layoutEvents.sort((a, b) => a.top - b.top);
    }, [todayEvents]);
    
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const textStyle = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
    const capitalize = s => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';

    return (
        <div className="day-view-scroll-container">
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
                <h3 className="h5 mb-0">
                    {capitalize(format(date, "eeee, dd 'de'", { locale: es }))} {capitalize(format(date, 'LLLL', { locale: es }))}
                </h3>
                <button className="btn btn-sm" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="day-view-content">
                <div className="position-relative" style={{ height: `${24 * 60}px` }}>
                    {format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd') && (
                        <div className="position-absolute w-100 d-flex align-items-center" style={{ top: `${calculatePosition(format(now, 'HH:mm'))}px`, zIndex: 10 }}>
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
                    
                    <div className="position-absolute" style={{ top: 0, bottom: 0, left: '60px', right: '10px' }}>
                        {processedEvents.map((event, index) => (
                            <div
                                ref={index === 0 ? firstEventRef : null}
                                key={event.id || index}
                                className="position-absolute rounded p-2 text-white small"
                                style={{
                                    top: `${event.top}px`, height: `${event.height}px`,
                                    left: event.left, width: event.width,
                                    backgroundColor: event.backgroundColor, zIndex: 1, cursor: 'pointer'
                                }}
                                onClick={() => setSelectedEvent(event)}
                            >
                                <p className="fw-bold mb-0" style={textStyle}>{event.titulo}</p>
                                <p className="mb-0" style={textStyle}>
                                  {event.hora_inicio?.substring(0,5)} - {event.hora_fin?.substring(0,5)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </div>
    );
};

export default DayView;