import CalendarComponent from '../components/CalendarComponent';
import colombiaEvents from '../data/colombia.json';
import mexicoEvents from '../data/mexico.json';

// Combina datos y define las pestañas para la vista LATAM
const events = {
    LATAM: [...colombiaEvents, ...mexicoEvents],
    Colombia: colombiaEvents,
    México: mexicoEvents,
};
const availableTabs = ['LATAM', 'Colombia', 'México'];
const defaultTab = 'LATAM';

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