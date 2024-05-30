import { useState, useRef } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Navbar.css";

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);    //defaluting isOpen to false

    //this funciton should flip the current boolean value of the is open variable
    const toggleMenu = () =>{
        setIsOpen(!isOpen);
    }
    return (

        <nav className="nav-bar">
            <a className="nav-title" href="">JCP.</a>

            <div className={`nav-links ${isOpen ? "active": ""}`}>
                
                {/* navigation page links */}
                <a className="nav-page" href="">About</a>
                <a className="nav-page" href="">Game Dev</a>
                <a className="nav-page" href="">Photography</a>
                <a className="nav-page" href="">web dev</a>
                <a className="nav-page" href="">2D</a>
                <a className="nav-page" href="">3D</a>
                <a className="nav-page" href="">extras</a>
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
                                <a className="menu-info-icon" href=""><FontAwesomeIcon icon="fa-regular fa-envelope" style={{color: "#ffffff",}} /></a>
                            </Col>
                            {/* Github Icon */}
                            <Col className="d-flex justify-content-center align-items-center">
                                <a className="menu-info-icon" href=""><FontAwesomeIcon icon="fa-brands fa-github" style={{color: "#ffffff",}} /></a>
                            </Col>
                            {/* LinkedIn Icon */}
                            <Col className="d-flex justify-content-center align-items-center">
                                <a className="menu-info-icon" href=""><FontAwesomeIcon icon="fa-brands fa-linkedin-in" style={{color: "#ffffff",}} /></a>
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