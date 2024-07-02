const Card1 = ({ link, title, img, types }) => (
    <div className='card h-100 card-up'>
        <a className='gradientBg' target='_blank' href={link}>
            <div className='position-absolute bottom-0 p-2 w-100'>
                <h1 className='text-white'>{title}</h1>
                <div className='d-flex flex-wrap'>
                    {types.map((type, index) => (
                        <span key={index} className={`mb-1 badge-cus ${index === 0 ? '' : 'ms-1'}`}>{type}</span>
                    ))}
                </div>
            </div>
        </a>
        <img className='w-100 h-100 object-fit-cover' src={img} alt={title} />
    </div>
);

export default Card1;

