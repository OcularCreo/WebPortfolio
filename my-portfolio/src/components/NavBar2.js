import { useState, useRef } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Container, Row, Col } from "react-bootstrap";
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
                <a href="">About</a>
                <a href="">Game Dev</a>
                <a href="">Photography</a>
                <a href="">web dev</a>
                <a href="">2D</a>
                <a href="">3D</a>
                <a href="">extras</a>
                
                <button className="nav-btn nav-btn-close" onClick={toggleMenu}> <FaTimes /> </button>

                {isOpen && (
                    <Container className="menu-info">
                        <Row className="justify-content-center">
                            <p className="menu-email">cooliganpangjordan@gmail.com</p>
                        </Row>
                        <Row className="justify-content-center">
                            <Col><a href="">Gmail</a></Col>
                            <Col><a href="">Gmail</a></Col>
                            <Col><a href="">Gmail</a></Col>
                        </Row>
                    </Container>
                    )
                }
                
            </div>

            {isOpen? null : <button className={`nav-btn ${isOpen ? "": "nav-btn-burger"}`} onClick={toggleMenu}> <FaBars /> </button>}
            
        </nav>

    );

}