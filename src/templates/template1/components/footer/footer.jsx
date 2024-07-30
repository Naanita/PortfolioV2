import v5 from '../../assets/video/5.mp4'
import HorizontalTextLeft from '../horizontalText/horizontalTextLeft.jsx';
import FollowUS from '../socialMedia/followUs.jsx';
import logo from '../../assets/svg/logo.svg';



const Footer = () => { 
    return (
        <div className="min-vh-100 position-relative z-4 mainsas"  style={{ background: "#070707", paddingTop:"10rem" }}>
            <div className="w-100 h-100 position-relative">
                <video className='w-100 h-100 object-fit-cover' src={v5} autoPlay muted loop></video>
                <div className="position-absolute bottom-0">
                    <HorizontalTextLeft
                        text="Lets talk about your future!"
                        container=".mainsas"
                    />
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='w-xl-75'>
                    <h1 className='text-white display-1 text-center'>Inspiration</h1>
                    <h3 className='text-white-800 text-center'>This is a design made from scratch but based on a proprietary design from <a className='fw-bold text-white' href='https://www.instagram.com/qclaydesign/'>Qclaydesign</a> made with the utmost respect and admiration, with the grace to practice my skills, I tried to replicate most of the animations, and designs. </h3>
                    <div className='pt-5 d-flex justify-content-center align-items-center text-center'>
                        <div className='w-50'>
                            <h2 className='text-white'>Visit Original design</h2>
                            <div className='d-flex justify-content-center align-items-center'>
                                <a className='fs-1 text-white me-4' href="https://www.instagram.com/reel/C9NKew-tJPM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target='_blank'>
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                                <a className='fs-1 text-white' href="https://www.threads.net/@qclaydesign/post/C8_u-mCypH-?xmt=AQGzNuXwUvXWji2sux6Heigu-iZ5jzJ2AXRv-pEjYJ9rOw" target='_blank'>
                                    <i class="fa-brands fa-threads"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className='container-fluid px-xl-5 pt-5' style={{ background: "#070707" }}>
                <div className='row'>
                    <div className='col-md-3 col-12 position-relative'>
                        <h2 className='text-white'>Programs</h2>
                        <ul className='list-unstyled text-white'>
                            <li> 
                                <a className='text-white text-decoration-none' href="">
                                    Copper 4 phase
                                </a>
                                </li>
                            <li> 
                                <a className='text-white text-decoration-none' href="">
                                    Bronze 3 phase
                                </a>
                                </li>
                            <li> 
                                <a className='text-white text-decoration-none' href="">
                                    Silver 2 phase
                                </a>
                                </li>
                            <li> 
                                <a className='text-white text-decoration-none' href="">
                                    Gold 1 pahse
                                </a>
                                </li>
                            <li> 
                                <a className='text-white text-decoration-none' href="">
                                    Diamond
                                </a>
                                </li>
                            <li> 
                                <a className='text-white text-decoration-none' href="">
                                    Competition
                                </a>
                                </li>
                            <li> 
                                <a className='text-white text-decoration-none' href="">
                                    Leaderboard
                                </a>
                                </li>
                        </ul>
                        <button className='position-relative bottom-0 btn-outline-white'>Free trial</button>
                    </div>
                    <div className='col-md-3 col-12'>
                        <h2 className='text-white'>About us</h2>
                        <ul className='list-unstyled text-white'>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    About us
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    Symbols
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    Affliliate partnership
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    FX-Trader manual
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    FX-Trader
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-md-3 col-12'>
                        <h2 className='text-white'>Legal informations</h2>
                        <ul className='list-unstyled text-white'>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    contact
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    Cookies
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    Rusk warning
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    Data protection
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    terms and conditions
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    Know your customer
                                </a>
                            </li>
                            <li>
                                <a className='text-white text-decoration-none' href="">
                                    Anti money laundering
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-md-3 col-12'>
                        <FollowUS />
                        <div className='d-flex justify-content-center'>
                            <a className="text-end fColvetica text-white fs-3 bouncecale" href="#">
                                <img src={logo} alt="logo" width="100" height="100" className="d-inline-block align-text-top" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='border-top mt-4 d-flex justify-content-between pt-3 pb-5'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p className='text-secondary small me-4'>Terms of use</p>
                        <p className='text-secondary small'>Privacy Policy</p>
                    </div>
                    <p className='text-white small'>Fxology, LLC. All rights reserved.</p>


                </div>
        </footer>
        </div>
    )
}

export default Footer;