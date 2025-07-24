import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const EventModal = ({ event, onClose }) => {
    document.body.style.overflow = 'hidden';
    const handleClose = () => {
        document.body.style.overflow = 'auto';
        onClose();
    };

    return (
        <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}>
            <div className="modal fade show d-block" onClick={handleClose}>
                <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content border-0 shadow-lg">
                        <div className="modal-header border-0 pb-0">
                            <span className="p-2 rounded" style={{ backgroundColor: 'var(--color-principalCalendar)' }}></span>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body px-4">
                            <h4 className="modal-title mb-3">{event.titulo}</h4>
                            <ul className="list-unstyled">
                                <li className="d-flex align-items-center mb-3">
                                    <i className="fas fa-clock fa-fw me-3 text-muted"></i>
                                    <span>{format(parseISO(event.fecha), "eeee, dd MMMM", { locale: es })} &middot; {event.horaInicio} - {event.horaFin}</span>
                                </li>
                                <li className="d-flex align-items-center mb-3">
                                    <i className="fas fa-map-marker-alt fa-fw me-3 text-muted"></i>
                                    <span>{event.lugar}</span>
                                </li>
                                <li className="d-flex align-items-center mb-3">
                                    <i className="fas fa-align-left fa-fw me-3 text-muted"></i>
                                    <span className='text-break'>{event.descripcion}</span>
                                </li>
                                <li className="d-flex align-items-center mb-3">
                                    <i className="fas fa-user fa-fw me-3 text-muted"></i>
                                    <span>{event.organizador}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="modal-footer border-top-0 p-0">
                            <a href={event.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-100 rounded-0 text-center">
                                Registro
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModal;