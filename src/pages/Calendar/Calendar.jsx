// src/components/Calendar.jsx

import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import MonthView from './MonthView';
import DayView from './DayView';
import PastEventModal from './PastEventModal'; // --- AÑADIDO: Importamos el nuevo modal
import './calendar.css';

const Calendar = ({ events, availableTabs, defaultTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPastEventModal, setShowPastEventModal] = useState(false);

    const monthViewRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('auto');

    // Esta lógica ya existente es perfecta. Filtrará los eventos automáticamente
    // cada vez que 'activeTab' cambie.
    const eventsForView = useMemo(() => events[activeTab], [activeTab, events]);

    useLayoutEffect(() => {
        if (monthViewRef.current) {
            setContentHeight(`${monthViewRef.current.offsetHeight}px`);
        }
    }, [activeTab, eventsForView]);

    const handleDayClick = (day) => {
        setSelectedDate(day);
    };
    
    const handleCloseDayView = () => {
        setSelectedDate(null);
    };

    // Esta función ahora activará nuestro nuevo modal de iOS.
    const handlePastEventClick = () => {
        setShowPastEventModal(true);
    };

    const monthViewClass = `month-view-wrapper ${selectedDate ? 'shrunk' : ''}`;
    const dayViewClass = `day-view-wrapper ${selectedDate ? 'visible' : ''}`;

    return (
        <div className="calendar-root-center">
            <div className="calendar-container d-flex flex-column h-100">
                <header className="">
                    {/* Lógica para mostrar pestañas solo si hay más de una disponible */}
                    {availableTabs.length > 1 && (
                        <ul className="nav nav-pills justify-content-center">
                            {availableTabs.map(tab => (
                                <li className="nav-item" key={tab}>
                                    <a
                                        className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault(); // Evita que la página se recargue
                                            setActiveTab(tab);  // Cambia la pestaña activa
                                            setSelectedDate(null); // Cierra la vista de día si está abierta
                                        }}
                                        // Asignamos un color personalizado al estilo 'active'
                                        style={activeTab === tab ? { backgroundColor: 'var(--color-principalCalendar)', color: 'white' } : {}}
                                    >
                                        {tab}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </header>

                <main className="calendar-body">
                    <div className={monthViewClass} ref={monthViewRef}>
                        <MonthView 
                            onDayClick={handleDayClick} 
                            onPastEventClick={handlePastEventClick} // Esto ya estaba bien
                            events={eventsForView} 
                        />
                    </div>
                    
                    <div className={`${dayViewClass} border-start`} style={{ height: contentHeight }}>
                        {selectedDate && (
                            <DayView 
                                date={selectedDate} 
                                events={eventsForView} 
                                onClose={handleCloseDayView} 
                            />
                        )}
                    </div>
                </main>

                {/* --- AÑADIDO: Renderizado condicional del nuevo modal --- */}
                {showPastEventModal && <PastEventModal onClose={() => setShowPastEventModal(false)} />}
            </div>
        </div>
    );
};

export default Calendar;