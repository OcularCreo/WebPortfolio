import { useState } from "react";
import '../styles/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';


export const NavBar = () => {
    
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () =>{
        setIsOpen(!isOpen);
    }

    return (

        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-title">JCP.</div>
                <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
                <div className="navbar-close" onClick={handleToggle}>
                    <FaTimes />
                </div>
                </div>
                <div className="navbar-toggle" onClick={handleToggle}>
                    <FaBars />
                </div>
            </div>
        </nav>
        
    );
}