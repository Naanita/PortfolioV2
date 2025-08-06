// src/components/Calendar.jsx

import { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import { isPast, isToday, startOfDay } from 'date-fns';
import MonthView from './MonthView';
import DayView from './DayView';
import './calendar.css';

export const eventColorMap = {
    'Open Course': '#ff006e',
    'Certificación': '#D20A11',
    'Taller': '#717171',
    'Hik-Masters': '#F18823',
    'Plática Comercial': '#1D1D1B',
    'Webinar': '#717171',
    'Presentación': '#263F91',
};

const Calendar = ({ events, availableTabs, defaultTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [selectedDate, setSelectedDate] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null);

    const monthViewRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('auto');

    const baseEventsForTab = useMemo(() => events[activeTab] || [], [activeTab, events]);

    const monthMapping = {
        'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
        'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
    };

    const visibleEvents = useMemo(() => {
        // const year = new Date().getFullYear();
        // const today = startOfDay(new Date());

        // return baseEventsForTab.filter(event => {
        //     if (!event.mes || !event.dia) return false;
        //     const capitalizedMonth = event.mes.charAt(0).toUpperCase() + event.mes.slice(1).toLowerCase();
        //     const monthIndex = monthMapping[capitalizedMonth];

        //     if (monthIndex === undefined) return false;
        //     const eventDate = new Date(year, monthIndex, parseInt(event.dia));

        //     return !isPast(eventDate) || isToday(eventDate);
        // });
        return baseEventsForTab;   // Comentar para filtrar los próximos eventos y descomentar el de arriba si se desea filtrar
    }, [baseEventsForTab]);

    const filteredEventsForDayView = useMemo(() => {
        if (!activeFilter) {
            return visibleEvents;
        }
        return visibleEvents.filter(event => event.tipo_evento === activeFilter);
    }, [activeFilter, visibleEvents]);

    const uniqueEventTypes = useMemo(() => {
        const types = new Set(visibleEvents.map(e => e.tipo_evento).filter(Boolean));
        return Array.from(types);
    }, [visibleEvents]);


    useLayoutEffect(() => {
        if (monthViewRef.current) {
            setContentHeight(`${monthViewRef.current.offsetHeight}px`);
        }
    }, [activeTab, baseEventsForTab, activeFilter]);
    
    useEffect(() => {
        if (selectedDate && activeFilter) {
            const eventsOnSelectedDate = filteredEventsForDayView.filter(event => {
                if (!event.mes || !event.dia) return false;
                const capitalizedMonth = event.mes.charAt(0).toUpperCase() + event.mes.slice(1).toLowerCase();
                const monthIndex = monthMapping[capitalizedMonth];
                const eventDate = new Date(new Date().getFullYear(), monthIndex, parseInt(event.dia));
                
                return monthIndex !== undefined && eventDate.toDateString() === selectedDate.toDateString();
            });

            if (eventsOnSelectedDate.length === 0) {
                setSelectedDate(null);
            }
        }
    }, [activeFilter, selectedDate, filteredEventsForDayView]);

    const handleDayClick = (day) => { setSelectedDate(day); };
    const handleCloseDayView = () => { setSelectedDate(null); };
    const handleFilterChange = (eventType) => {
        setActiveFilter(prevFilter => (prevFilter === eventType ? null : eventType));
    };

    const monthViewClass = `month-view-wrapper ${selectedDate ? 'shrunk' : ''}`;
    const dayViewClass = `day-view-wrapper ${selectedDate ? 'visible' : ''}`;

    return (
        <div className="calendar-root-center">
            <div className="calendar-container d-flex flex-column h-100">
                <header className="p-3">
                    {availableTabs.length > 1 && (
                        <ul className="nav nav-pills justify-content-center mb-3">
                            {availableTabs.map(tab => (
                                <li className="nav-item" key={tab}>
                                    <a
                                        className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setActiveTab(tab);
                                            setSelectedDate(null);
                                            setActiveFilter(null);
                                        }}
                                        style={activeTab === tab ? { backgroundColor: 'var(--color-principalCalendar)', color: 'white' } : {}}
                                    >
                                        {tab}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                    
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                        {uniqueEventTypes.map(type => (
                            // --- AJUSTE ---
                            // Se envuelve el botón en un contenedor para posicionar el tooltip
                            <div key={type} className="filter-tooltip-container">
                                <button
                                    aria-label={type} // Se usa aria-label para accesibilidad
                                    onClick={() => handleFilterChange(type)}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: eventColorMap[type] || eventColorMap.default,
                                        borderRadius: '50%',
                                        border: activeFilter === type ? '3px solid #007bff' : '1px solid #ddd',
                                        cursor: 'pointer',
                                        padding: 0,
                                        transition: 'all 0.2s'
                                    }}
                                />
                                <span className="filter-tooltip-text">{type}</span>
                            </div>
                        ))}
                    </div>
                </header>

                <main className="calendar-body">
                    <div className={monthViewClass} ref={monthViewRef}>
                        <MonthView 
                            onDayClick={handleDayClick} 
                            events={visibleEvents}
                            activeFilter={activeFilter}
                        />
                    </div>
                    
                    <div className={`${dayViewClass} border-start`} style={{ height: contentHeight }}>
                        {selectedDate && (
                            <DayView 
                                date={selectedDate} 
                                events={filteredEventsForDayView}
                                onClose={handleCloseDayView} 
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Calendar;