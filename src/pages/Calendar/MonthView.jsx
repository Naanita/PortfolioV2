// src/components/MonthView.jsx

import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, isPast, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

const MonthView = ({ onDayClick, onPastEventClick, events }) => {
    // El estado se inicializa con la fecha actual. Dado que estamos a julio de 2025,
    // el calendario se mostrará para el mes y año correctos.
    const [currentDate] = useState(new Date());

    // Objeto para mapear nombres de meses a números (0-11)
    const monthMapping = {
        'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
        'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
    };

    const eventsByDay = useMemo(() => {
        const grouped = {};
        if (!events) return grouped;

        const year = currentDate.getFullYear();

        events.forEach(event => {
            const monthIndex = monthMapping[event.mes];
            const day = parseInt(event.dia, 10);

            // Se asegura que el mes y el día son válidos antes de crear la clave
            if (monthIndex !== undefined && !isNaN(day)) {
                // Construye la clave en formato 'yyyy-MM-dd' para que coincida con la del calendario
                const dayKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                
                if (!grouped[dayKey]) {
                    grouped[dayKey] = [];
                }
                grouped[dayKey].push(event);
            }
        });
        return grouped;
    }, [events, currentDate]);

    const firstDayOfMonth = startOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: endOfMonth(firstDayOfMonth) });
    const startingDayIndex = (getDay(firstDayOfMonth) + 6) % 7;

    // Tooltip state para mostrar solo uno a la vez (opcional)
    const [hoveredDay, setHoveredDay] = useState(null);

    // Obtener mes y año del primer evento si existe, si no usar la fecha actual
    let displayMonth = null;
    let displayYear = null;
    if (events && events.length > 0) {
        displayMonth = events[0].mes;
    } else {
        displayMonth = format(new Date(), 'LLLL', { locale: es });
        displayYear = new Date().getFullYear();
    }

    // Capitalizar la primera letra del mes
    const capitalize = s => s && s[0].toUpperCase() + s.slice(1).toLowerCase();

    return (
        <div className="p-3">
            <h2 className="text-center h4 mb-4">
                {capitalize(displayMonth)} {displayYear}
            </h2>
            <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map(d => <div key={d} className="text-center fw-bold small text-muted">{d}</div>)}
                {Array.from({ length: startingDayIndex }).map((_, i) => <div key={`e-${i}`}></div>)}
                {daysInMonth.map(day => {
                    const dayKey = format(day, 'yyyy-MM-dd');
                    const hasEvents = !!eventsByDay[dayKey];
                    const isPastDayWithEvents = hasEvents && isPast(day) && !isToday(day);

                    // Tooltip content
                    let tooltipContent = '';
                    if (isPastDayWithEvents) {
                        tooltipContent = 'Ya no hay eventos disponibles';
                    } else if (hasEvents) {
                        const count = eventsByDay[dayKey].length;
                        tooltipContent = `${count} Evento${count > 1 ? 's' : ''}\n`
                    }

                    const getBackgroundColor = () => {
                        if (isPastDayWithEvents) return 'var(--color-secundarioCalendar)';
                        if (hasEvents) return 'var(--color-principalCalendar)';
                        return 'transparent';
                    };

                    const getTextColor = () => {
                        if (hasEvents) return 'white';
                        if (isToday(day)) return 'var(--color-principalCalendar)';
                        return 'black';
                    };

                    const handleClick = () => {
                        if (isPastDayWithEvents) {
                            onPastEventClick();
                        } else if (hasEvents) {
                            onDayClick(day);
                        }
                    };

                    return (
                        <div key={day.toString()} className="text-center py-2" style={{ position: 'relative' }}>
                            <button
                                className="btn btn-sm rounded-circle"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    backgroundColor: getBackgroundColor(),
                                    color: getTextColor(),
                                    border: isToday(day) ? `2px solid var(--color-principalCalendar)` : 'none',
                                    cursor: hasEvents ? 'pointer' : 'default',
                                    position: 'relative',
                                }}
                                onClick={hasEvents ? handleClick : undefined}
                                onMouseEnter={() => hasEvents && setHoveredDay(dayKey)}
                                onMouseLeave={() => setHoveredDay(null)}
                            >
                                {format(day, 'd')}
                                {/* Tooltip */}
                                {hasEvents && (
                                    <div
                                        className={`calendar-tooltip${hoveredDay === dayKey ? ' show' : ''}`}
                                        aria-hidden={hoveredDay !== dayKey}
                                    >
                                        {tooltipContent.split('\n').map((line, i) => (
                                            <div key={i}>{line}</div>
                                        ))}
                                    </div>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthView;