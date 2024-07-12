import { useParams, useLocation } from "react-router-dom";
import "../styles/ProjectPage.css";
import { fetchOneProject } from "../services/apiServices";
import { useState, useEffect } from "react";

export const ProjectPage = (props) =>{
    
    const params = useParams();         //used to get the project id in url
    const location = useLocation();     //used to get the current page location

    const [project, setProject] = useState(); 

    useEffect(() => {

        const getProjectData = async () => {
            
            const pageSegments = location.pathname.split('/'); 
            const section = '/' + pageSegments[1];

            const data = await fetchOneProject(section, params.id);
            setProject(data);

        }

        getProjectData();

    }, [location]);

    return (
        <div className="background">
            <div className="title-container">
                <h1 className="title">{project && project.title}</h1>
                <p className="date">{project && project.date}</p>
            </div>
            <div className="imgs-container">

            </div>
            <div className="desc-container">
                <h1 className="about-title"><span className="thick">about</span> <span className="thin">{project && project.title}</span></h1>
                <p className="desc"></p>
            </div>
        </div>
    );
}