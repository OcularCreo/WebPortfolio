import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/PortfolioBtn.css";

export const PortfolioBtn = (props) =>{

    return (
        <button className="port-btn">
                <span className="btn-icon">{props.icon}</span>
                <span className="btn-title">{props.title}</span>
        </button>
    );

}