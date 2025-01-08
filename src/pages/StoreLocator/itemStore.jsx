import { useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';

const ItemStore = ({ name, position, address, hours, phone, website, images, userPosition }) => {
    useEffect(() => {
        const lightbox = GLightbox({
            selector: '.glightbox',
        });
        return () => {
            lightbox.destroy();
        };
    }, []);

    const openGoogleMaps = () => {
        const [lat, lng] = position;
        const [userLat, userLng] = userPosition;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${lat},${lng}`;
        window.open(url, '_blank');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const getNextDay = (day) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const index = daysOfWeek.indexOf(day);
        return daysOfWeek[(index + 1) % 7];
    };

    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
    const currentHour = new Date().getHours() + new Date().getMinutes() / 60;
    const todayHours = hours.find(hour => hour.day === currentDay);
    const nextDayHours = hours.find(hour => hour.day === getNextDay(currentDay));

    const parseTime = (time) => {
        const [timePart, modifier] = time.split(' ');
        let [hour, minute] = timePart.split(':').map(Number);

        if (modifier === 'PM' && hour !== 12) {
            hour += 12;
        } else if (modifier === 'AM' && hour === 12) {
            hour = 0;
        }

        return hour + minute / 60;
    };

    const openingHour = parseTime(todayHours.open);
    const closingHour = parseTime(todayHours.close);
    const nextOpeningHour = parseTime(nextDayHours.open);
    const isOpen = currentHour >= openingHour && currentHour < closingHour;

    return (
        <div className='store-separator store-itemSeparator'>
            <Splide
                options={{
                    type: 'slide',
                    autoplay: false,
                    rewind: false,
                    arrows: true,
                }}
            >
                {Object.values(images).map((image, index) => (
                    <SplideSlide key={index} className="store-contentImg">
                        <div className="store-image-container">
                            <img src={image} alt={`store-${index}`} />
                            <a href={image} className="glightbox overlay" data-gallery={`gallery-${name}`}>
                                <i className="fa-solid fa-expand fs-1 text-white"></i>
                            </a>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
            
            <div className='d-flex justify-content-between align-items-center pt-2'>
                <div>
                    <h1 className='fs-3 m-0 p-0'>{name}</h1>
                    <p className='m-0 p-0 text-secondary'>{address}</p>
                    <div className='d-flex flex-wrap gap-1 fotnSize-14px'>
                        <p className={`m-0 p-0 ${isOpen ? 'store-open' : 'store-closed'}`}>{isOpen ? 'Open' : 'Closed'}</p>
                        <p className='m-0 p-0'>·</p>
                        <p className='p-0 m-0'>
                            {isOpen ? `Closes at: ${todayHours.close}` : `Opens at: ${nextDayHours.open}`}
                        </p>
                    </div>
                </div>
                <div className='d-flex justify-content-center flex-column align-items-center ms-4'>
                    <button className="store-ButtonDirection" onClick={openGoogleMaps}>
                        <i className="fa-solid fa-diamond-turn-right fs-5"></i>
                    </button>
                    <p className='small p-0 m-0'>Indications</p>
                </div>
            </div>
            <div className='py-2'>
                <div className='d-flex justify-content-between align-items-center storeHeight-30px hover-show fotnSize-14px'>
                    <div className='d-flex flex-wrap justify-content-start gap-1'>
                        <i className="fa-solid fa-phone text-ColorHik"></i>
                        <p className='p-0 m-0'>{phone}</p>
                    </div>
                    <div className='d-flex flex-wrap justify-content-start gap-1'>
                        <a href="#" className='store-ButtonSlim' onClick={() => copyToClipboard(phone)}>
                            <i className="fa-solid fa-copy"></i>
                        </a>
                        <a href={`tel:${phone}`} className='store-ButtonSlim'>
                            <i className="fa-solid fa-phone"></i>
                        </a>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center storeHeight-30px hover-show fotnSize-14px'>
                    <div className='d-flex flex-wrap justify-content-start gap-2'>
                        <i className="fa-solid fa-globe text-ColorHik"></i>
                        <p className='p-0 m-0'>Website</p>
                    </div>
                    <div className='d-flex flex-wrap justify-content-start gap-2'>
                        <a href={website} target="_blank" rel="noopener noreferrer" className='store-ButtonSlim'>
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                        <a href="#" className='store-ButtonSlim' onClick={() => copyToClipboard(website)}>
                            <i className="fa-solid fa-copy"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="accordion border-0" id="accordionExample">
                <div className="accordion-item border-0">
                    <h2 className="accordion-header border-0">
                        <button className="StoreAccordion accordion-button fs-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Store Hours
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse text-dark border-0" data-bs-parent="#accordionExample">
                        <div className="accordion-body store-paddingCard">
                            <table className="table table-borderless text-start">
                                <tbody>
                                    {hours.map((hour, index) => (
                                        <tr key={index}>
                                            <td className='fw-bold'>{hour.day.slice(0, 3)}</td>
                                            <td>{hour.open}</td>
                                            <td>{hour.close}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemStore;