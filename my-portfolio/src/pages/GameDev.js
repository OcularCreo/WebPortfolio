import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectThumbnail } from '../components/ProjectThumbnail';
import "../styles/GameDev.css";
import { fetchAllProjects } from '../services/apiServices';
import { useLocation } from 'react-router-dom';

export const GameDev = () =>{

    const locaiton = useLocation();

    const projects = []; 
    const getProjects = () =>{
        projects = fetchAllProjects(locaiton);
    }

    return(
        
        <div className="background">
            {/* Above: Background wrapper div (essentially covers whole background of page screen) Below: Content-grid container sets sizing for all page*/}
            <div className="content-grid">

                {/* Title-container - special item of the grid layout. Needs to span the whole width of the grid layout for alignment/design reasons */}
                <div className="title-container first-item">
                    
                    <h1 className="title-icon"><FontAwesomeIcon icon="fa-solid fa-gamepad" /></h1>  {/* Title icons element */}
                    <h1 className="page-title">Game Development</h1>                                {/* Title element */}

                    {/* Container for  */}
                    <div className="rec-container">
                        <div className="white-rec rec-1"/>
                        <div className="white-rec rec-2"/>
                    </div>
                </div>

                {/* Project items: Following elements should be thumbnails for projects featured on this page */}
                <div className="project-item"></div>
                <div className="project-item"></div>
                <div className="project-item"></div>
                <div className="project-item"></div>
                <ProjectThumbnail />
            </div>
            
        </div>
    );
}