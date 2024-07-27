import "../styles/Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Footer = () => {

    return (
        <div className="footer">
            <div className="email-container">
                <a  className="foot-icon" 
                    href="mailto:cooliganpangjordan@gmail.com" 
                    target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-regular fa-envelope" style={{color: "#ffffff",}} /></a>
                <a>cooliganpangjordan@gmail.com</a>
                
            </div>
            <div className="footer-links">
                <a  className="foot-icon" 
                    href="https://github.com/OcularCreo" 
                    target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-brands fa-github" style={{color: "#ffffff",}} /></a>
                <a  className="foot-icon" 
                    href="https://linkedin.com/in/jordan-cooligan-pang-1b2a7721b" 
                    target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-brands fa-linkedin-in" style={{color: "#ffffff",}} /></a>
            </div>
        </div>
    );

}