import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/DropDown.css';

export const CustomDropDown = (props) => {

    const [isDropOpen, setIsDropOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDrop = (e) => {     
        e.stopPropagation();
        setIsDropOpen((prevState) => !prevState);
    }

    const handleOutsideClick = (e) => {
        if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
            setIsDropOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('touchstart', handleOutsideClick); 
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('touchstart', handleOutsideClick);
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, []);

    return (
        <div ref={dropdownRef} className={`cust-btn ${isDropOpen ? 'open' : ''}`} onClick={toggleDrop}>
            <p className="btn-txt">
                {props.btnTxt ? props.btnTxt : ""} {isDropOpen ? <FontAwesomeIcon icon="fa-solid fa-caret-up" /> : <FontAwesomeIcon icon="fa-solid fa-caret-down" />}
            </p>
            <ul className="drop-items">
                {props.items && props.items.map((item, index) => (
                    <li><a onClick={(e) => e.stopPropagation()} className="drop-item-link" key={index} target={item.docPath ? "_blank" : ""} href={item.docPath ? item.docPath : ""}>{item.type}</a></li>
                ))}
            </ul>
        </div>
    );
}