
import CalendarComponent from './Calendar';
import colombiaEvents from './data/colombia.json';
import mexicoEvents from './data/mexico.json';

const events = {
    Colombia: colombiaEvents,
    México: mexicoEvents,
};

const availableTabs = ['Colombia', 'México'];

const defaultTab = 'Colombia';

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