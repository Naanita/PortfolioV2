// src/components/CalendarComponent.jsx

import { useState, useMemo } from 'react';
import MonthView from './MonthView';
import DayView from './DayView';
import './calendar.css';

const CalendarComponent = ({ events, availableTabs, defaultTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [view, setView] = useState('month');
    const [selectedDate, setSelectedDate] = useState(new Date());

    // --- NUEVO ESTADO PARA EL MODAL DE EVENTOS PASADOS ---
    const [showPastEventModal, setShowPastEventModal] = useState(false);

    const eventsForView = useMemo(() => events[activeTab], [activeTab, events]);

    const handleDayClick = (day) => {
        setSelectedDate(day);
        setView('day');
    };

    // --- NUEVA FUNCIÓN PARA MOSTRAR EL AVISO DE EVENTO PASADO ---
    const handlePastEventClick = () => {
        setShowPastEventModal(true);
    };

    const renderView = () => {
        switch (view) {
            case 'day':
                // Se pasa la función para volver a la vista de mes
                return <DayView date={selectedDate} events={eventsForView} onClose={() => setView('month')} />;
            case 'month':
            default:
                // Se pasan las dos funciones de clic al MonthView
                return <MonthView onDayClick={handleDayClick} onPastEventClick={handlePastEventClick} events={eventsForView} />;
        }
    };

    return (
        <div className="d-flex flex-column h-100">
            <header className="p-3 border-bottom">
                <nav className="nav nav-tabs">
                    {availableTabs.map(tabName => (
                        <li className="nav-item" key={tabName}>
                            <button
                                className={`nav-link ${activeTab === tabName ? 'active' : ''}`}
                                onClick={() => setActiveTab(tabName)}
                                style={activeTab === tabName ? { borderColor: 'var(--color-principalCalendar)', color: 'var(--color-principalCalendar)' } : {}}
                            >
                                {tabName}
                            </button>
                        </li>
                    ))}
                </nav>
            </header>

            <main className="calendar-body">
                {renderView()}
            </main>

            {/* --- MODAL PARA EVENTOS PASADOS --- */}
            {showPastEventModal && (
                <div className="modal-backdrop fade show" style={{ zIndex: 1060 }}>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Evento Pasado</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowPastEventModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>No puedes ingresar porque este evento ya pasó. ¡Te invitamos a registrarte en los próximos!</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowPastEventModal(false)}>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarComponent;