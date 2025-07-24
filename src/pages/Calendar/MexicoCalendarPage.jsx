import CalendarComponent from '../Calendar/Calendar.jsx';
import mexicoEvents from './data/mexico.json';

// Define los datos y pestañas solo para esta página
const events = { México: mexicoEvents };
const availableTabs = ['México'];
const defaultTab = 'México';

const MexicoCalendarPage = () => {
    return (
        <CalendarComponent
            events={events}
            availableTabs={availableTabs}
            defaultTab={defaultTab}
        />
    );
};

export default MexicoCalendarPage;