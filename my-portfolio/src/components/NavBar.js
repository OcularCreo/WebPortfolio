import { useState, useEffect } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);               //defaluting isOpen to false
    const [scrollToAbout, setScrollToAbout] = useState(false); //defaulting scrollToAbout to false
    const location = useLocation();

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
        setScrollToAbout(true);
    }

    //use effect for scrolling to the about me section on the home page
    //dependencies are on location and scrollToAbout to ensure code runs when the home page is reached and loaded
    useEffect(() => {

        //make sure that scrollToAbout is true and the user is on the home page
        if(scrollToAbout && location.pathname === '/'){

            const aboutElement = document.getElementById("aboutme");    //search for the about section by its id
            
            if(aboutElement !== null){                                  //make sure the element was found
                aboutElement.scrollIntoView({ behavior: "smooth" });    //smoothly scroll to the element when found
            }
            setScrollToAbout(false);                                    //set the scroll to about back to false
        }

        if(isOpen){
            document.documentElement.classList.add("no-scroll");
        } else {
            document.documentElement.classList.remove("no-scroll");
        }

    }, [location, scrollToAbout, isOpen]);

    return (

        <nav className="nav-bar">
            <NavLink className="nav-title" to="/">JCP.</NavLink>

            <div className={`nav-links ${isOpen ? "active": ""}`}>
                
                {/* navigation page links */}
                <NavLink className="nav-page" to="/" onClick={navToAbout}>About</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/gamedev">Game Dev</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/photography">Photography</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/webdev">Web Dev</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/2d">2D</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/3d">3D</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active-underline nav-page' : 'nav-page'} onClick={handleMenu} to="/">Extras</NavLink>
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