import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/DropDown.css';

export const CustomDropDown = (props) => {

    const [isDropOpen, setIsDropOpen] = useState(false);

    const toggleDrop = () => {
        setIsDropOpen(!isDropOpen);
    }

    return (
        <div className={`cust-btn ${isDropOpen ? 'open' : ''}`} onTouchEnd={toggleDrop} onMouseEnter={toggleDrop} onMouseLeave={toggleDrop}>
            <p className="btn-txt">
                {props.btnTxt ? props.btnTxt : ""} {isDropOpen ? <FontAwesomeIcon icon="fa-solid fa-caret-up" /> : <FontAwesomeIcon icon="fa-solid fa-caret-down" />}
            </p>
            <ul className="drop-items">
                {props.items && props.items.map((item, index) => (
                    <li><a className="drop-item-link" key={index} target={item.docPath ? "_blank" : ""} href={item.docPath ? item.docPath : ""}>{item.type}</a></li>
                ))}
            </ul>
        </div>
    );
}