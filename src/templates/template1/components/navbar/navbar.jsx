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
        <nav class="navbar navbar-expand-lg bg-transparent fixed-top mt-4">
            <div class="container-fluid">
                <a class="navbar-brand fColvetica text-white fs-3 bouncecale" href="#">
                    <img src={logo} alt="logo" width="40" height="40" class="d-inline-block align-text-top"/>
                        Fology
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 glasgTemps-bg">
                        <li class="nav-item">
                            <a class="nav-link nav-linkTemp active" aria-current="page" href="#"><i class="fa-regular fa-star"></i> Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-linkTemp" href="#">How it Works</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-linkTemp" href="#">Programs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-linkTemp" href="#">Support</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-linkTemp" href="#">Carees</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-linkTemp" href="#">Become a Parther</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-linkTemp nav-linkTemp-outline-white" href="#">Login / Register</a>
                        </li>
                    </ul>
                    <div class="d-flex justify-content-between align-items-center">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 glasgTemps-bg noAnipo bouncecale" style={{height:"3rem"}}>
                            <li class="nav-item dropdown">
                            <a class="nav-link nav-linkTemp dropdown-toggle fa" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-regular fa-chess-knight me-2"></i>
                                English
                            </a>
                            <ul class="dropdown-menu bg-transparent">
                                <li><a class="dropdown-item text-white bg-hovertransparent" href="#">Action</a></li>
                                <li><a class="dropdown-item text-white bg-hovertransparent" href="#">Another action</a></li>
                                <li><a class="dropdown-item text-white bg-hovertransparent" href="#">Something else here</a></li>
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