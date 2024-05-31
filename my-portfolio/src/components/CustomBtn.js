import '../styles/CustomBtn.css';
import { Button } from "react-bootstrap";

export const CustomBtn = ({btnTxt}) => {
    return (
        <Button variant="outline-light rounded-pill border-2" className="btn-element">
            <span className="btn-txt">{btnTxt}</span>
        </Button>
    );
}