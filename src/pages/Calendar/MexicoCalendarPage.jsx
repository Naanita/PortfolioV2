import CalendarComponent from '../Calendar/Calendar.jsx';
import mexicoEvents from './data/mexico.json';

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