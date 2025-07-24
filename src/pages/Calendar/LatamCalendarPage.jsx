// LatamCalendarPage.jsx

import CalendarComponent from './Calendar';
import colombiaEvents from './data/colombia.json';
import mexicoEvents from './data/mexico.json';

// --- MODIFICADO: Se elimina la combinación de eventos para 'LATAM' ---
const events = {
    // Ya no existe la clave LATAM
    Colombia: colombiaEvents,
    México: mexicoEvents,
};

// --- MODIFICADO: Se eliminó 'LATAM' de las pestañas disponibles ---
const availableTabs = ['Colombia', 'México'];

// --- MODIFICADO: Se establece un país como la pestaña por defecto ---
const defaultTab = 'Colombia'; // O 'México', el que prefieras que aparezca primero

const LatamCalendarPage = () => {
    return (
        <CalendarComponent
            events={events}
            availableTabs={availableTabs}
            defaultTab={defaultTab}
        />
    );
};

export default LatamCalendarPage;