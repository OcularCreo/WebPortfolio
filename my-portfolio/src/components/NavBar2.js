import { useState, useRef } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import "../styles/Navbar2.css"

export const NavBar2 = () => {

    const [isOpen, setIsOpen] = useState(false);    //defaluting isOpen to false

    //this funciton should flip the current boolean value of the is open variable
    const toggleMenu = () =>{
        setIsOpen(!isOpen);
    }
    return (

        <nav className="nav-bar">
            <a className="nav-title" href="">JCP.</a>

            <div className={`nav-links ${isOpen ? "active": ""}`}>
                <a className="nav-page" href="">About</a>
                <a className="nav-page" href="">Game Dev</a>
                <a className="nav-page" href="">Photography</a>
                <a className="nav-page" href="">web dev</a>
                <a className="nav-page" href="">2D</a>
                <a className="nav-page" href="">3D</a>
                <a className="nav-page" href="">extras</a>
                <button className="nav-btn nav-btn-close" onClick={toggleMenu}> <FaTimes /> </button>

                {isOpen && (
                    <Container className="menu-info" style={{marginTop: "100px"}}>
                        <Row className="justify-content-center">
                            <p className="menu-email">cooliganpangjordan@gmail.com</p>
                        </Row>
                        <Row className="">
                            <Col><a href="" className=""><FontAwesomeIcon icon={faEnvelope} style={{color: "#ffffff",}} /></a></Col>
                            <Col><a href="" className=""><FontAwesomeIcon icon={faGithub} style={{color: "#ffffff",}} /></a></Col>
                            <Col><a href="" className=""><FontAwesomeIcon icon={faLinkedinIn} style={{color: "#ffffff",}} /></a></Col>
                        </Row>
                    </Container>
                    )
                }
                
            </div>

            {isOpen? null : <button className={`nav-btn ${isOpen ? "": "nav-btn-burger"}`} onClick={toggleMenu}> <FaBars /> </button>}
            
        </nav>

    );

}