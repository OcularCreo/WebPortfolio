import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/GameDev.css";

export const GameDev = () =>{

    return(
        <div className="background">
            <div className="title-container">
                <h1 className="title-icon"><FontAwesomeIcon icon="fa-solid fa-gamepad" /></h1>
                <h1 className="page-title">Game Development</h1>
                <div className="rec-container">
                    <div className="white-rec rec-1"/>
                    <div className="white-rec rec-2"/>
                </div>
            </div>

            <div className="projects-container">

            </div>
            
        </div>
    );
}