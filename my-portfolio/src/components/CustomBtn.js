import '../styles/CustomBtn.css';
import { Button } from "react-bootstrap";

export const CustomBtn = ({btnTxt, onClick}) => {
    return (
        <Button variant="outline-light rounded-pill border-2" className="btn-element" onClick={onClick}>
            <span className="btn-txt">{btnTxt}</span>
        </Button>
    );
}