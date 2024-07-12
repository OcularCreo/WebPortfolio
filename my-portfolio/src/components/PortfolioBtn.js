import { useNavigate } from "react-router-dom";
import "../styles/PortfolioBtn.css";
import { PiDropSimple } from "react-icons/pi";

export const PortfolioBtn = (props) =>{

    const navigate = useNavigate();

    //funciton handles portfolio button clicks, should navigate users to the given page
    const handleClick = () =>{
        if(props.page !== null) {
            navigate(props.page);
        }
    }

    return (
        <button className="port-btn" onClick={handleClick}>
                <span className="btn-icon">{props.icon}</span>
                <span className="btn-title">{props.title}</span>
        </button>
    );

}