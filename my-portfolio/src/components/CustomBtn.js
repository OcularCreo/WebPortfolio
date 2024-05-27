import '../styles/CustomBtn.css';
import { Button } from "react-bootstrap";

export const CustomBtn = ({btnTxt}) => {
    return (
        <Button variant="outline-light rounded-pill border-2" className="btn-sm btn-lg">
            <span className="btn-txt fs-sm fs-lg">{btnTxt}</span>
        </Button>
    );
}