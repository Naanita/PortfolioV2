// src/components/DayView.jsx

import { useState, useEffect, useMemo, useRef } from 'react';
import { format, getMonth, getDate } from 'date-fns';
import { es } from 'date-fns/locale';
import EventModal from './EventModal';

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

    const todayEvents = events
        .filter(e => {
            const eventMonth = monthMapping[e.mes];
            const eventDay = parseInt(e.dia, 10);
            return getMonth(date) === eventMonth && getDate(date) === eventDay;
        })
        .sort((a, b) => a.horario_inicio.localeCompare(b.horario_inicio));

    const calculatePosition = (time) => {
        const cleanedTime = time.replace(/\s*(a\. m\.|p\. m\.)/i, '').trim();
        const [hour, minute] = cleanedTime.split(':').map(Number);
        return hour * 60 + minute;
    };

    // --- LÓGICA DE PROCESAMIENTO MEJORADA ---
    const processedEvents = useMemo(() => {
        const colorPalette = [
            'var(--color-principalCalendar)', '#f83b43', '#ff6a70', '#ffa0a4', 
            '#ffc7c9', '#ffe1e2', '#fff1f2'
        ];

        // Se agrupa por la posición vertical (minutos desde medianoche) para normalizar la hora
        const groups = {};
        todayEvents.forEach(event => {
            const topPosition = calculatePosition(event.horario_inicio);
            const key = `pos-${topPosition}`; // Clave de grupo normalizada
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(event);
        });

        const layoutEvents = [];
        Object.values(groups).forEach(group => {
            const groupSize = group.length;
            const widthPercent = 100 / groupSize;

            // Ordenar por duración para una mejor visualización (opcional)
            group.sort((a, b) => calculatePosition(a.horario_fin) - calculatePosition(b.horario_fin));

            group.forEach((event, index) => {
                const top = calculatePosition(event.horario_inicio);
                const end = calculatePosition(event.horario_fin);
                const height = Math.max(end - top, 30);

                layoutEvents.push({
                    ...event,
                    top: top,
                    height: height,
                    width: `calc(${widthPercent}% - 5px)`,
                    left: `${index * widthPercent}%`,
                    backgroundColor: colorPalette[index % colorPalette.length],
                });
            });
        });

        return layoutEvents.sort((a, b) => a.top - b.top);
    }, [todayEvents]);
    
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const textStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };

    // Obtener el mes del evento correspondiente al día seleccionado, no solo el primer evento global
    let displayMonth = format(date, 'LLLL', { locale: es });
    if (events && events.length > 0) {
        // Buscar el evento que coincida con el día y mes seleccionados
        const eventForDay = events.find(e => {
            const eventMonth = monthMapping[e.mes];
            const eventDay = parseInt(e.dia, 10);
            return getMonth(date) === eventMonth && getDate(date) === eventDay;
        });
        if (eventForDay && eventForDay.mes) {
            displayMonth = eventForDay.mes;
        }
    }
    // Capitalizar la primera letra y el resto en minúscula
    const capitalize = s => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';

    return (
        <div className="day-view-scroll-container">
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
                <h3 className="h5 mb-0">
                    {capitalize(format(date, "eeee, dd 'de'", { locale: es }))} {capitalize(displayMonth)}
                </h3>
                <button className="btn btn-sm" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="day-view-content">
                <div className="position-relative" style={{ height: `${24 * 60}px` }}>
                    {/* Línea de Hora Actual ('Now') */}
                    {format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd') && (
                        <div className="position-absolute w-100 d-flex align-items-center" style={{ top: `${calculatePosition(format(now, 'HH:mm'))}px`, zIndex: 10 }}>
                            <div className="small me-1" style={{ color: 'var(--color-principalCalendar)' }}>{format(now, 'HH:mm')}</div>
                            <div className="w-100" style={{ height: '2px', backgroundColor: 'var(--color-principalCalendar)' }}></div>
                        </div>
                    )}

                    {/* Marcadores de Hora */}
                    {hours.map(hour => (
                        <div key={hour} className="d-flex border-top" style={{ height: '60px' }}>
                            <div className="small text-muted p-1" style={{ width: '50px' }}>{`${hour}:00`}</div>
                            <div className="w-100 border-start"></div>
                        </div>
                    ))}
                    
                    {/* Contenedor para los eventos posicionados */}
                    <div className="position-absolute" style={{ top: 0, bottom: 0, left: '60px', right: '10px' }}>
                        {processedEvents.map((event, index) => (
                            <div
                                ref={index === 0 ? firstEventRef : null}
                                key={event.id}
                                className="position-absolute rounded p-2 text-white small"
                                style={{
                                    top: `${event.top}px`,
                                    height: `${event.height}px`,
                                    left: event.left,
                                    width: event.width,
                                    backgroundColor: event.backgroundColor,
                                    zIndex: 1,
                                    cursor: 'pointer'
                                }}
                                onClick={() => setSelectedEvent(event)}
                            >
                                <p className="fw-bold mb-0" style={textStyle}>{event.titulo}</p>
                                <p className="mb-0" style={textStyle}>{event.horario_inicio} - {event.horario_fin}</p>
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