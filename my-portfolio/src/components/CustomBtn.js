import '../styles/CustomBtn.css';
import { Button } from "react-bootstrap";
import '../styles/DropDown.css';

export const CustomBtn = ({btnTxt, onClick}) => {
    return (
        <div  className="cust-btn" onClick={onClick}>
            <span className="btn-txt">{btnTxt}</span>
        </div>
    );
}