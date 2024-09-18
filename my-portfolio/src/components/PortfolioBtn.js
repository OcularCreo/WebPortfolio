import { useNavigate } from "react-router-dom";
import "../styles/PortfolioBtn.css";

export const PortfolioBtn = (props) =>{

    const navigate = useNavigate();

    //funciton handles portfolio button clicks, should navigate users to the given page
    const handleClick = () =>{
        if(props.page !== null) {
            navigate(props.page);
        }
    }

    //funciton keeps track of mouse cursor when hovering over a portfolio button. Positions flashlight effect at position of cursor
    const handleMouseMove = (e) => {
        //get the x and y position of the target
        let x = e.pageX - e.currentTarget.offsetLeft;   
        let y = e.pageY - e.currentTarget.offsetTop; 

        //set the --x and --y variables to the x and y calculated
        e.currentTarget.style.setProperty('--x', x + "px");
        e.currentTarget.style.setProperty('--y', y + "px");
    }

    return (
        <button onMouseMove={handleMouseMove} className="port-btn" onClick={handleClick}>
                <span className="btn-icon">{props.icon}</span>
                <span className="btn-title">{props.title}</span>
        </button>
    );

}