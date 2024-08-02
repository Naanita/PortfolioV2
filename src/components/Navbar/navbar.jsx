import './navbar.css';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import mode from '../../assets/svg/mode.svg';
import logo from '../../assets/svg/logo.svg';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ sectionRefs }) => {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);
    const navRef = useRef(null);
    const indicatorRef = useRef(null);
    const modeIconRef = useRef(null);
    const leftNavRef = useRef(null);
    const rightNavRef = useRef(null);

    const getPreferredTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) return storedTheme;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        animateModeIcon(theme);
    };

    const animateModeIcon = (theme) => {
        gsap.to(modeIconRef.current, {
            rotate: theme === 'dark' ? '224deg' : '45deg',
            duration: 0.5
        });
    };

    const animateNavMargins = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "0% 0%",
                end: "20% 20%",
                scrub: 2,
            }
        });

        tl.to([leftNavRef.current, rightNavRef.current], {
            marginRight: '0.5rem',
            marginLeft: '0.5rem',
            duration: 0.5,
        });
    };


    useEffect(() => {
        const setActiveIndexBasedOnPathname = () => {
            const paths = ['about-me', 'skills', 'experience', 'templates', 'projects', 'contact'];
            const currentPath = location.pathname.replace(/^\//, '').toLowerCase().replace(/\/$/, '');
            const activeIndex = paths.findIndex(path => currentPath.startsWith(path.toLowerCase()));
            setActiveIndex(activeIndex >= 0 ? activeIndex : 0);
        };
        setTheme(getPreferredTheme());
        animateNavMargins();
        if (location.pathname === '/') {
            const observerOptions = {
                rootMargin: '-50% 0px -50% 0px',
            };
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const index = sectionRefs.findIndex(ref => ref.current === entry.target);
                            setActiveNavLink(index);
                        }
                    });
                },
                observerOptions
            );

            sectionRefs.forEach(ref => {
                if (ref.current) observer.observe(ref.current);
            });

            return () => sectionRefs.forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        } else {
            const navItems = navRef.current.children;
            if (navItems.length > 0) {
                const { offsetLeft, clientWidth } = navItems[activeIndex];
                indicatorRef.current.style.left = `${offsetLeft}px`;
                indicatorRef.current.style.width = `${clientWidth - 10}px`;
            }
            setActiveIndexBasedOnPathname();
        }
    }, [sectionRefs, activeIndex, location.pathname]);

    const setActiveNavLink = (index) => {
        const navItems = navRef.current.children;
        Array.from(navItems).forEach((item, idx) => {
            if (idx === index) {
                item.children[0]?.classList.add('active');
                const { offsetLeft, clientWidth } = item;
                indicatorRef.current.style.left = `${offsetLeft}px`;
                indicatorRef.current.style.width = `${clientWidth - 10}px`;
            } else {
                item.children[0]?.classList.remove('active');
            }
        });
    };

    return (
        <nav className="navbar navbar-expand-lg bg-transparent fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand d-xl-none d-md-none glasg-bg p-1 text-center" href="/">
                    <img src={logo} alt="logo" style={{ height: '30px' }} />
                </a>
                <div className='d-flex'>
                    <a className='navbar-brand d-xl-none d-md-none glasg-bg p-1 text-center h-100 d-flex' onClick={() => setTheme(getPreferredTheme() === 'dark' ? 'light' : 'dark')}>
                        <img ref={modeIconRef} src={mode} alt="darkMode" style={{ height: '30px', transform: "rotate(45deg)" }} />
                    </a>
                    <button className="navbar-toggler glasg-bg p-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 glasg-bg d-sm-none" style={{ marginRight: 'auto' }} ref={leftNavRef}>
                        <li className="nav-item">
                            <a className='nav-link' href="/">
                                <img src={logo} alt="logo" style={{ height: '20px' }} />
                            </a>
                        </li>
                    </ul>
                    {location.pathname === '/' ?
                        <ul className="navbar-nav mb-2 mb-lg-0 glasg-bg py-2" ref={navRef}>
                            {['', 'About Me', 'Skills', 'Experience', 'Templates', 'Projects', 'Contact'].map((item, index) => (
                                <li className="nav-item" key={index} onClick={() => setActiveIndex(index)}>
                                    <a
                                        className={`nav-link hoverEffect-1 ${index === activeIndex ? 'active' : ''}`}
                                        href={
                                            item.toLowerCase() === 'about me' ||
                                            item.toLowerCase() === 'experience' ||
                                            item.toLowerCase() === 'contact'||
                                            item.toLowerCase() === 'templates' 
                                                ? '#'
                                                : `/${item.toLowerCase().replace(' ', '-')}`
                                        }
                                    >
                                        <span className="group-hover">
                                            {item}
                                        </span>
                                    </a>

                                </li>
                            ))}
                            <div className="nav-indicator" ref={indicatorRef}></div>
                        </ul>
                        :
                        <ul className="navbar-nav mb-2 mb-lg-0 glasg-bg py-2" ref={navRef}>
                            {['About Me', 'Skills', 'Experience', 'Projects', 'templates', 'Contact'].map((item, index) => (
                                <li className="nav-item" key={index} onClick={() => setActiveIndex(index)}>
                                    <a className={`nav-link hoverEffect-1  ${index === activeIndex ? 'active' : ''}`} href={`/${item.toLowerCase() === 'about me' ? '#' : `${item.toLowerCase() === 'experience' ? '#' : ''}` ? '#' : `${item.toLowerCase() === 'contact' ? '#' : ''}` ? '#' : ''}${item.toLowerCase().replace(' ', '-')}`}>
                                        <span>
                                            <div className="group-hover">{item}</div>
                                            <div className="group-hover">{item}</div>
                                        </span>
                                    </a>
                                </li>
                            ))}
                            <div className="nav-indicator" ref={indicatorRef}></div>
                        </ul>
                    }
                    <ul className="navbar-nav mb-2 mb-lg-0 glasg-bg d-sm-none" style={{ marginLeft: 'auto' }} ref={rightNavRef}>
                        <li className="nav-item">
                            <a className='nav-link cursor-pointer' onClick={() => setTheme(getPreferredTheme() === 'dark' ? 'light' : 'dark')}>
                                <img ref={modeIconRef} src={mode} alt="darkMode" style={{ height: '20px', transform: "rotate(45deg)" }} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;