// src/components/EventModal.jsx
import './EventModal.css';

const EventModal = ({ event, onClose }) => {
    if (!event) return null;

    const formatTimeInfo = (timeStr) => {
        if (!timeStr || typeof timeStr !== 'string') {
            return { time: '', period: '' };
        }

        const hasAm = timeStr.toLowerCase().includes('a');
        const hasPm = timeStr.toLowerCase().includes('p');

        let cleanedTime = timeStr.replace(/\s*(a\. m\.|p\. m\.|a|p)/gi, '').trim();
        let [hours, minutes] = cleanedTime.split(':').map(Number);

        if (isNaN(hours) || isNaN(minutes)) {
            return { time: '', period: '' };
        }

        if (hasPm && hours !== 12) {
            hours += 12;
        } else if (hasAm && hours === 12) {
            hours = 0;
        }

        const displayPeriod = hours >= 12 ? 'PM' : 'AM';
        let displayHours = hours % 12;
        if (displayHours === 0) {
            displayHours = 12;
        }

        return {
            time: `${displayHours}:${String(minutes).padStart(2, '0')}`,
            period: displayPeriod
        };
    };

    const startTime = formatTimeInfo(event.horario_inicio);
    const endTime = formatTimeInfo(event.horario_fin);

    return (
        <div className="event-modal-backdrop" onClick={onClose}>
            <div className="compact-event-modal" onClick={(e) => e.stopPropagation()}>

                <div className="compact-modal-header container">
                    <div className="calendar-icon col-2">
                        <span className="month">{event.mes?.substring(0, 3).toUpperCase()}</span>
                        <span className="day">{event.dia}</span>
                    </div>
                    <div className="event-info col-8">
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
                        <span>{event.lugar} - {event.direccion_formacion}</span>
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