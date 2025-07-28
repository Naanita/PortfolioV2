// src/components/EventModal.jsx
import './EventModal.css';

const EventModal = ({ event, onClose }) => {
    if (!event) return null;

    // 3. Ajuste para el nuevo formato de hora "HH:mm:ss"
    const formatTimeInfo = (timeStr) => {
        if (!timeStr || typeof timeStr !== 'string') {
            return { time: '', period: '' };
        }
        
        // El formato de entrada es 24-horas (ej: "09:00:00")
        let [hours, minutes] = timeStr.split(':').map(Number);

        if (isNaN(hours) || isNaN(minutes)) {
            return { time: '', period: '' };
        }
        
        const displayPeriod = hours >= 12 ? 'PM' : 'AM';
        let displayHours = hours % 12;
        if (displayHours === 0) { // Para las 12 PM y 12 AM
            displayHours = 12;
        }

        return {
            time: `${displayHours}:${String(minutes).padStart(2, '0')}`,
            period: displayPeriod
        };
    };

    const startTime = formatTimeInfo(event.hora_inicio);
    const endTime = formatTimeInfo(event.hora_fin);

    return (
        <div className="event-modal-backdrop" onClick={onClose}>
            <div className="compact-event-modal" onClick={(e) => e.stopPropagation()}>

                <div className="compact-modal-header container">
                    <div className="calendar-icon col-2">
                        <span className="month">{event.mes?.substring(0, 3).toUpperCase()}</span>
                        <span className="day">{event.dia}</span>
                    </div>
                    <div className="event-info col-8">
                        <p className='txt-modalidad'>{event.modalidad}</p>
                        <p className="event-title">{event.titulo}</p>
                    </div>
                    <button className="close-button col-2" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="compact-modal-body">
                    <div className="time-display-wrapper">
                        <div className="time-block">
                            <span className="time-large">{startTime.time}</span>
                            <span className="time-period">{startTime.period}</span>
                        </div>
                        <div className="time-separator">&gt;</div>
                        <div className="time-block">
                            <span className="time-large">{endTime.time}</span>
                            <span className="time-period">{endTime.period}</span>
                        </div>
                    </div>

                    <div className="details-section">
                        <i className="fas fa-user-tie icon"></i>
                        <span><strong>{event.organizador}</strong></span>
                    </div>

                    <div className="details-section">
                        <i className="fas fa-map-marker-alt icon"></i>
                        {/* 3. Usar el nuevo campo 'direccion' */}
                        <span>{event.lugar} - {event.direccion}</span>
                    </div>
                </div>

                <div className="compact-modal-footer">
                     {event.link_registro && event.link_registro !== 'nan' && (
                        <a href={event.link_registro} target="_blank" rel="noopener noreferrer" className="register-button">
                            <i className="fas fa-edit icon"></i>
                            <span>Regístrate</span>
                        </a>
                     )}
                </div>
            </div>
        </div>
    );
};

export default EventModal;