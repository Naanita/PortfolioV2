import CalendarComponent from '../components/CalendarComponent';
import colombiaEvents from '../data/colombia.json';

// Define los datos y pestañas solo para esta página
const events = { Colombia: colombiaEvents };
const availableTabs = ['Colombia'];
const defaultTab = 'Colombia';

const ColombiaCalendarPage = () => {
    return (
        <CalendarComponent
            events={events}
            availableTabs={availableTabs}
            defaultTab={defaultTab}
        />
    );
};

export default ColombiaCalendarPage;