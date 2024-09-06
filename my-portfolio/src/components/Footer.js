import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useScrollToElement } from "../helpers/scrollToElement";
import "../styles/Footer.css";

export const Footer = () => {

    const triggerScroll = useScrollToElement();

    //function used to scroll to top of the page if the current location and navlink lead to the same place
    const handleSameNavClick = (path) => {
        
        if(window.location.pathname === path){
            window.scroll(0, 0);
        }
    }

    return (
        <div className="footer">
            <div className="foot-top">
                <div className="footer-icons">
                    <a  className="foot-icon" 
                        href="mailto:cooliganpangjordan@gmail.com" 
                        target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-regular fa-envelope" style={{color: "#ffffff",}} /></a>
                    <a  className="foot-icon" 
                        href="https://github.com/OcularCreo" 
                        target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-brands fa-github" style={{color: "#ffffff",}} /></a>
                    <a  className="foot-icon" 
                        href="https://linkedin.com/in/jordan-cooligan-pang-1b2a7721b" 
                        target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-brands fa-linkedin-in" style={{color: "#ffffff",}} /></a>
                </div>

                <img id="foot-logo" src={`${process.env.PUBLIC_URL}/JCPLogo.svg`} loading="lazy" alt="JCP SVG Logo"></img>
                <a href="mailto:cooliganpangjordan@gmail.com" 
                   target="_blank" rel="noopener noreferrer" id="foot-email">cooliganpangjordan@gmail.com</a>
            </div>
            <div className="foot-mid">
                <hr id="foot-divider"></hr>
            </div>
            <div className="foot-bottom">
                <p id="site-map-title">site map</p>
                <div className="site-map-links">
                    <NavLink className="footer-nav" to="/"              onClick={() => handleSameNavClick("/")}>Home</NavLink>
                    <NavLink className="footer-nav" to="/"              onClick={() => triggerScroll("aboutme")}>About</NavLink>
                    <NavLink className="footer-nav" to="/gamedev"       onClick={() => handleSameNavClick("/gamedev")}>game dev</NavLink>
                    <NavLink className="footer-nav" to="/photography"   onClick={() => handleSameNavClick("/photography")}>photography</NavLink>
                    <NavLink className="footer-nav" to="/webdev"        onClick={() => handleSameNavClick("/webdev")}>web dev</NavLink>
                    <NavLink className="footer-nav" to="/2d"            onClick={() => handleSameNavClick("/2d")}>2d</NavLink>
                    <NavLink className="footer-nav" to="/3d"            onClick={() => handleSameNavClick("/3d")}>3d</NavLink>
                    <NavLink className="footer-nav" to="/extras"        onClick={() => handleSameNavClick("/extras")}>extras</NavLink>
                </div>
            </div>
        </div>
    );

}