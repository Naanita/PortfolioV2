import './program.css';
import Card1 from '../cards/card1.jsx';
const programs = () => { 

    const programs = [
        {
            title: 'Copper 4',
            description: 'Fxology COPPER 4 phase training program',
            category: 'For beginners and advanced traders',
            icon:'4',
            stars: 1,
            hexColor: '#8E644B',
        },
        {
            title: 'Bronze 3',
            description: 'Fxology BRONZE 3 phase training program',
            category: 'For moderately and advanced traders',
            icon: '3',
            stars: 2,
            hexColor: '#803518',
        },
        {
            title: 'Silver 2',
            description: 'Fxology SILVER 2 phase training program',
            category: 'For more advanced traders',
            icon: '2',
            stars: 3,
            hexColor: '#C0C0C0',
        },
        {
            title: 'Gold 1',
            description: 'Fxology GOLD 1 phase training program',
            category: 'For advanced traders',
            icon: '1',
            stars: 4,
            hexColor: ' #FFD700',
        },
        {
            title: 'Diamond',
            description: 'Fxology Diamond phase training program',
            category: 'For experienced traders',
            icon: '<i class="fa-regular fa-gem"></i>',
            stars: 5,
            hexColor: ' #694F8E',
        }

        
    ]


    return (
        <div className='min-vh-100 bg-temp1-1 position-relative z-4 overflow-hidden'>
                        <div className='blocksDiv' style={{ height: "30vh", width: "60vw", left:"50%", transform:"translateX(-50%)" }}>
                <div className='blocksContentShadow'></div>
            </div>
            <h1 className="display-1 line-height-1 text-white m-0 text-center mt-5" style={{ paddingTop: "3rem" }}>choose one of our programs</h1>
            <p className="fs-5 text-white text-center mb-5">What is your experice and what you prefer?</p>
            <div className='circle-green position-absolute z-n1' style={{ top: "0%", left:'50%', transform:'translateX(-50%)', opacity:"0.5" }}></div>
            <div className='row g-4 justify-content-center align-items-center flex-wrap carsaw mb-5'>
                {programs.map((program, index) => (
                    <div className='col-md-4 col-12' key={index}>
                        <Card1
                            icon={program.icon}
                            title={program.title}
                            description={program.description}
                            category={program.category}
                            starts={program.stars}
                            hexColor={program.hexColor}
                        />
                    </div>
                ))}
            </div>
        </div>
    )   
}

export default programs;