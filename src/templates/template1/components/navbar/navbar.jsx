import './navbar.css';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import mode from '../../../../assets/svg/mode.svg';
import logo from '../../assets/svg/logo.svg';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg bg-transparent fixed-top mt-4">
            <div className="container-fluid">
                <a className="navbar-brand fColvetica text-white fs-3 bouncecale" href="#">
                    <img src={logo} alt="logo" width="40" height="40" className="d-inline-block align-text-top" />
                    Fology
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 glasgTemps-bg">
                        <li className="nav-item">
                            <a className="nav-link nav-linkTemp active" aria-current="page" href="#"><i className="fa-regular fa-star"></i> Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-linkTemp" href="#">How it Works</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-linkTemp" href="#">Programs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-linkTemp" href="#">Support</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-linkTemp" href="#">Carees</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-linkTemp" href="#">Become a Parther</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-linkTemp nav-linkTemp-outline-white" href="#">Login / Register</a>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 glasgTemps-bg noAnipo bouncecale" style={{ height: "3rem", margin: "3px 0px" }}>
                            <li className="nav-item dropdown">
                                <a className="nav-link nav-linkTemp dropdown-toggle fa" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-regular fa-chess-knight me-2"></i>
                                    English
                                </a>
                                <ul className="dropdown-menu bg-transparent">
                                    <li><a className="dropdown-item text-white bg-hovertransparent" href="#">Action</a></li>
                                    <li><a className="dropdown-item text-white bg-hovertransparent" href="#">Another action</a></li>
                                    <li><a className="dropdown-item text-white bg-hovertransparent" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div className='btn-exploreWhiGreen mx-2 bouncecale'>
                            <p>Start a challenge</p>
                            <div className='icon'>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                        <button className='btn-outline-white bouncecale'>Free Trial</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;