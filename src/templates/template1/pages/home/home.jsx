import './home.css';

const Template1Home = () => {
    return (
        <div className="bg-temp1 position-relative min-vh-100 overflow-hidden d-flex justify-content-center align-items-center flex-column" style={{ perspective: '30rem' }} >
            <div className='w-100 h-100 position-absolute' style={{ transformStyle: "preserve-3d" }}>
                <div className='circle-transparent' style={{ transform: "translateX(70%)" }}></div>
                <div className='bg-horizontal-lines position-absolute' style={{ transform: "rotateY(70deg) translateX(-65rem) translateZ(-30rem)" }}></div>
                <div className='bg-horizontal-lines position-absolute' style={{ transform: "rotateY(-70deg) translateX(65rem) translateZ(-30rem)" }}></div>
                <div className='bg-horizontal-lines position-absolute w-50' style={{ transform: "translate(-50%, -50%) translateZ(-5.4rem)", top: "50%", left: "50%" }}></div>
                <div className='greenLight'></div>
            </div>

            <div className='position-relative d-flex justify-content-center align-items-center flex-column'>
                <div className='d-flex align-items-center flex-column'>
                    <div className='d-flex align-items-center'>
                        <p className='text-white me-2 m-0'>Our Team</p>
                        <span className='badgeTemp'><i class="fa-regular fa-star"></i>Success</span>
                    </div>
                    <h1 className='gradient-Text display-1Plus2 text-center line-height-1 py-3 w-xl-60'>No Time Limit Prop Firm Conquer the Market</h1>
                    <div className='d-flex flex-wrap justify-content-between align-items-center'>
                        <div className='badgeTempnoBg'>
                            <i class="fa-regular fa-gem"></i>
                            <p className='title'>The lab™</p>
                            <p>Native platform</p>
                        </div>
                        <div className='badgeTempnoBg'>
                            <i class="fa-regular fa-hand-peace"></i>
                            <p>Fast progress</p>
                        </div>
                        <div className='badgeTempnoBg'>
                            <i class="fa-regular fa-message"></i>
                            <p>No time Limit Prop firm</p>
                        </div>
                        <div className='badgeTempnoBg'>
                            <i class="fa-regular fa-circle"></i>
                            <p>Unique programs</p>
                        </div>
                    </div>
                    <div className='d-flex flex-wrap justify-content-between align-items-center mt-4'>
                        <div className='btn-exploreWhiGreen me-3'>
                            <p>Start a challenge</p>
                            <div className='icon'>
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                        <div className='btn-outline-white'>Free Trial</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Template1Home;