// src/components/PastEventModal.jsx

import './PastEventModal.css';

const PastEventModal = ({ onClose }) => {
    // Bloqueamos el scroll del body mientras el modal está abierto
    // Este es un efecto secundario que se maneja directamente aquí.
    document.body.style.overflow = 'hidden';

    const handleClose = () => {
        // Al cerrar, restauramos el scroll del body
        document.body.style.overflow = 'auto';
        onClose();
    };

    return (
        <div className="past-event-modal-backdrop" onClick={handleClose}>
            <div className="past-event-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="past-event-modal-header">
                    <p className="past-event-modal-title">Este evento ya ha vencido</p>
                </div>
                <div className="past-event-modal-body">
                    <p>¡Inscríbete en uno de los próximos eventos disponibles!</p>
                </div>
                <div className="past-event-modal-footer">
                    <button className="past-event-modal-button primary" onClick={handleClose}>
                        Explorar eventos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PastEventModal;