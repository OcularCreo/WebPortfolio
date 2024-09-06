import { useState, useEffect } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import { useScrollToElement } from "../helpers/scrollToElement";
import "../styles/Navbar.css";

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);               //defaluting isOpen to false
    const triggerScroll = useScrollToElement();

    //this funciton should flip the current boolean value of the is open variable
    const toggleMenu = () =>{
        setIsOpen(!isOpen);
    }

    //used for automatically closing the menu while in mobile mode
    const handleMenu = () => {
        if(isOpen) {
            setIsOpen(false);
        }
    }

    //function sets scroll to about to true, later utlized in the useEffect below
    const navToAbout = () =>{
        handleMenu();
        triggerScroll("aboutme");
    }

    //toggle scroll ability depending on if the mobile menu is open or not
    useEffect(() => {
        if(isOpen){
            document.documentElement.classList.add("no-scroll");
        } else {
            document.documentElement.classList.remove("no-scroll");
        }
    }, [isOpen]);

    return (

        <nav className="nav-bar">
            <NavLink className="nav-title" to="/">JCP.</NavLink>

            <div className={`nav-links ${isOpen ? "active-menu": ""}`}>
                
                {/* navigation page links */}
                <NavLink className="nav-page" to="/" onClick={navToAbout}>About</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/gamedev">Game Dev</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/photography">Photography</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/webdev">Web Dev</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/2d">2D</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/3d">3D</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/extras">Extras</NavLink>
                <button className="nav-btn nav-btn-close" onClick={toggleMenu}> <FaTimes /> </button>

                {/* Additional info for mobile menu */}
                {isOpen && (
                    <Container className="menu-info fixed-bottom mb-4">
                        {/* Written out Gmail */}
                        <Row className="justify-content-center">
                            <p className="menu-email">cooliganpangjordan@gmail.com</p>
                        </Row>
                        {/* Icons links to socials */}
                        <Row className="justify-content-center px-4">
                            {/* Email Icon */}
                            <Col className="d-flex justify-content-center align-items-center">
                                <a className="menu-info-icon" 
                                   href="mailto:cooliganpangjordan@gmail.com" 
                                   target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-regular fa-envelope" style={{color: "#ffffff",}} /></a>
                            </Col>
                            {/* Github Icon */}
                            <Col className="d-flex justify-content-center align-items-center">
                                <a className="menu-info-icon" 
                                   href="https://github.com/OcularCreo"
                                   target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-brands fa-github" style={{color: "#ffffff",}} /></a>
                            </Col>
                            {/* LinkedIn Icon */}
                            <Col className="d-flex justify-content-center align-items-center">
                                <a className="menu-info-icon" 
                                   href="https://linkedin.com/in/jordan-cooligan-pang-1b2a7721b"
                                   target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-brands fa-linkedin-in" style={{color: "#ffffff",}} /></a>
                            </Col>
                        </Row>
                    </Container>
                    )
                }
                
            </div>
            
            {/* Only render the button element when the mobile menu is closed */}
            {isOpen? null : <button className={`nav-btn ${isOpen ? "": "nav-btn-burger"}`} onClick={toggleMenu}> <FaBars /> </button>}
            
        </nav>

    );

}