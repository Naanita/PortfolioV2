// src/components/MonthView.jsx

import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, isPast, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

const MonthView = ({ onDayClick, onPastEventClick, events }) => {
    const [currentDate] = useState(new Date());

    const eventsByDay = useMemo(() => {
        const grouped = {};
        events.forEach(event => {
            const dayKey = event.fecha;
            if (!grouped[dayKey]) grouped[dayKey] = [];
            grouped[dayKey].push(event);
        });
        return grouped;
    }, [events]);

    const firstDayOfMonth = startOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: endOfMonth(firstDayOfMonth) });
    const startingDayIndex = (getDay(firstDayOfMonth) + 6) % 7;
    const today = startOfDay(new Date());

    return (
        <div className="p-3">
            <h2 className="text-center h4 mb-4">{format(currentDate, 'MMMM yyyy', { locale: es })}</h2>
            <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map(d => <div key={d} className="text-center fw-bold small text-muted">{d}</div>)}
                {Array.from({ length: startingDayIndex }).map((_, i) => <div key={`e-${i}`}></div>)}
                {daysInMonth.map(day => {
                    const dayKey = format(day, 'yyyy-MM-dd');
                    const hasEvents = !!eventsByDay[dayKey];
                    const isPastDayWithEvents = hasEvents && isPast(day) && !isToday(day);

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
                        <div key={day.toString()} className="text-center py-2">
                            <button
                                className="btn btn-sm rounded-circle"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    backgroundColor: getBackgroundColor(),
                                    color: getTextColor(),
                                    border: isToday(day) ? `2px solid var(--color-principalCalendar)` : 'none',
                                    cursor: hasEvents ? 'pointer' : 'default'
                                }}
                                onClick={hasEvents ? handleClick : undefined}
                            >
                                {format(day, 'd')}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthView;