import { useParams, useLocation } from "react-router-dom";
import "../styles/ProjectPage.css";
import { fetchAllProjects } from "../services/apiServices";

export const ProjectPage = (props) =>{
    
    const params = useParams();         //used to get the project id in url
    const location = useLocation();     //used to get the current page location

    const project = null;
    const getProjects = () =>{
        projects = fetchOneProjects(location, params);
    }

    return (
        <div className="background">
            <div className="title-container">
                <h1 className="title"></h1>
                <p className="date"></p>
            </div>
            <div className="imgs-container">

            </div>
            <div className="desc-container">
                <h1 className="about-title"><span className="thick">about</span> <span className="thin">project name</span></h1>
                <p className="desc"></p>
            </div>
        </div>
    );
}