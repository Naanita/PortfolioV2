// src/components/MonthView.jsx

import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, isPast, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { eventColorMap } from './Calendar';

const MonthView = ({ onDayClick, events, activeFilter }) => {
    const [currentDate] = useState(new Date());

    const monthMapping = {
        'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
        'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
    };

    const eventsByDay = useMemo(() => {
        const grouped = {};
        if (!events) return grouped;

        const year = currentDate.getFullYear();
        const today = startOfDay(new Date());

        events.forEach(event => {
            // --- AJUSTE ---
            if (!event.mes || !event.dia) return;
            const capitalizedMonth = event.mes.charAt(0).toUpperCase() + event.mes.slice(1).toLowerCase();
            const monthIndex = monthMapping[capitalizedMonth];
            const day = parseInt(event.dia, 10);

            if (monthIndex !== undefined && !isNaN(day)) {
                const eventDate = new Date(year, monthIndex, day);

                // Se elimina la condición 'if' para que todos los eventos se procesen
                const dayKey = format(eventDate, 'yyyy-MM-dd');
                if (!grouped[dayKey]) grouped[dayKey] = [];
                grouped[dayKey].push(event);
            }
        });
        return grouped;
    }, [events]);

    const firstDayOfMonth = startOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: endOfMonth(firstDayOfMonth) });
    const startingDayIndex = (getDay(firstDayOfMonth) + 6) % 7;
    const [hoveredDay, setHoveredDay] = useState(null);
    const capitalize = s => s && s[0].toUpperCase() + s.slice(1).toLowerCase();

    return (
        <div className="p-3">
            <h2 className="text-center h4 mb-4">
                {capitalize(format(currentDate, 'LLLL', { locale: es }))} {currentDate.getFullYear()}
            </h2>
            <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map(d => <div key={d} className="text-center fw-bold small text-muted">{d}</div>)}
                {Array.from({ length: startingDayIndex }).map((_, i) => <div key={`e-${i}`}></div>)}
                {daysInMonth.map(day => {
                    const dayKey = format(day, 'yyyy-MM-dd');
                    const dayEvents = eventsByDay[dayKey];
                    const hasEvents = !!dayEvents && dayEvents.length > 0;

                    const getBackgroundStyle = () => {
                        if (!hasEvents) return { backgroundColor: 'transparent' };
                        const uniqueTypes = [...new Set(dayEvents.map(e => e.tipo_evento))];
                        const colors = uniqueTypes.map(type => eventColorMap[type] || eventColorMap.default);
                        if (colors.length === 1) return { background: colors[0] };
                        return { background: `linear-gradient(45deg, ${colors.join(', ')})` };
                    };

                    const getOpacity = () => {
                        if (!activeFilter || !hasEvents) return 1;
                        const hasFilteredEvent = dayEvents.some(e => e.tipo_evento === activeFilter);
                        return hasFilteredEvent ? 1 : 0.3;
                    };

                    return (
                        <div key={day.toString()} className="text-center py-2" style={{ position: 'relative' }}>
                            <button
                                className="btn btn-sm rounded-circle"
                                style={{
                                    width: '36px', height: '36px',
                                    color: hasEvents ? 'white' : (isToday(day) ? 'var(--color-principalCalendar)' : 'black'),
                                    border: isToday(day) ? `2px solid var(--color-principalCalendar)` : 'none',
                                    cursor: hasEvents ? 'pointer' : 'default',
                                    position: 'relative',
                                    transition: 'opacity 0.3s ease-in-out',
                                    ...getBackgroundStyle(),
                                    opacity: getOpacity(),
                                }}
                                onClick={hasEvents ? () => onDayClick(day) : undefined}
                                onMouseEnter={() => hasEvents && setHoveredDay(dayKey)}
                                onMouseLeave={() => setHoveredDay(null)}
                            >
                                {format(day, 'd')}
                                {hasEvents && (
                                    <div
                                        className={`calendar-tooltip${hoveredDay === dayKey ? ' show' : ''}`}
                                        aria-hidden={hoveredDay !== dayKey}
                                    >
                                        {`${dayEvents.length} Evento${dayEvents.length > 1 ? 's' : ''}`}
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