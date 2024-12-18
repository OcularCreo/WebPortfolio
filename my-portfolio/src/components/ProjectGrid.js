import { ProjectThumbnail } from './ProjectThumbnail';
import "../styles/ProjectGrid.css";
import { fetchAllProjects } from '../services/apiServices';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export const ProjectGrid = (props) =>{

    const location = useLocation();                     //used to keep track of url locaiton
    const [projects, setProjects] = useState(null);         //variable stores data on the projects related to the page
    const [overEight, setOverEight] = useState(false);  //boolean to determine if num proj is over 8 (used for grid styling purposes)
    const controllerRef = useRef();

    useEffect (() => {

        //check if there's a controller ref already, if so abort it
        if(controllerRef.current) {
            controllerRef.current.abort();
        } 

        //create a new abort controller and signal variable
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;

        //fetching project data asyncronously
        const getProjects = async () => {
            
            setProjects(null);                                                  //clear the projects when getting new projects
           
            const data = await fetchAllProjects(location.pathname, { signal }); //using fetchallprojects and sending the file path location to get related projs
            
            if(data){
                setOverEight(data.length > 8);                                  //determining if the number of projects fetched is over 8
                setProjects(data);                                              //storing fetched project data
            } else {
                setProjects(null);
            }
        }

        getProjects();                                                          //calling get projects for fetching the data

        //when dismounting, if there's a controller ref abort it
        return () => {
            if(controllerRef.current) {
                controllerRef.current.abort();
            }
        }

    }, [location]);

    return(
        
        <div className="background">
            {/* Above: Background wrapper div (essentially covers whole background of page screen) Below: Content-grid container sets sizing for all page*/}
            <div className={ overEight ? 'content-grid' : 'single-content-grid' }>

                {/* Title-container - special item of the grid layout. Needs to span the whole width of the grid layout for alignment/design reasons */}
                <div className={`title-container ${overEight ? "first-item" : ''}`}>
                    
                    <h1 className="title-icon">{props.icon}</h1>  {/* Title icons element */}
                    <h1 className="page-title">{props.category}</h1>  {/* Title element */}

                    {/* Container for  */}
                    
                    <div className="rec-container">
                        <div className="white-rec rec-1"/>
                        <div className="white-rec rec-2"/>
                    </div>
                </div>

                {/* Project items: Following elements should be thumbnails for projects featured on this page */}
                {projects ? projects.map(project => (
                    <ProjectThumbnail className={!overEight ? "single" : "multi"} key={project.id} id={project.id} title={project.title} 
                    imgPath={`${project.mediaPath}${project.thumbSrc}`} smallSrc={project.hasSmallImages ? `${project.mediaPath}scaled_${project.thumbSrc}`: false} />)) : 
                    <>
                        <div className="skeleton skel-proj-thumb"></div>
                        <div className="skeleton skel-proj-thumb"></div>
                        <div className="skeleton skel-proj-thumb"></div>
                    </>}
            </div>
            
        </div>
    );
}