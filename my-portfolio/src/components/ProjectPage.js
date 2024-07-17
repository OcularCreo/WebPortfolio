import { useParams, useLocation } from "react-router-dom";
import "../styles/ProjectPage.css";
import { fetchOneProject } from "../services/apiServices";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export const ProjectPage = (props) =>{
    
    const params = useParams();         //used to get the project id in url
    const location = useLocation();     //used to get the current page location

    const [project, setProject] = useState(); 
    const [markdownData, setMarkdownData] = useState("");

    useEffect(() => {

        const getProjectData = async () => {
            
            const pageSegments = location.pathname.split('/'); 
            const section = '/' + pageSegments[1];

            const data = await fetchOneProject(section, params.id);
            setProject(data);

            if(data.markdownPath){
                const response = await fetch(data.markdownPath); 
                const markdownText = await response.text(); 
                setMarkdownData(markdownText);
            }

        }

        getProjectData();

    }, [location]);

    return (
        <div className="background">
            <div className="proj-title-container">
                <h1 className="proj-title">{project && project.title}</h1>
                <p className="date">{project && project.date}</p>
            </div>
            <div className="gallery-container">
                {project && project.images && project.images.map((image, index) => (
                    <div className="gallery-item" key={index}>
                        <img src={`${project.mediaPath}${image}`} alt={`${image}`} className="gallery-image" />
                    </div>
                ))}

                <div className="desc-container">
                    <h1 className="proj-about-title"><span className="thick">about</span> <span className="thin">{project && project.title}</span></h1>
                    <ReactMarkdown className={"md-desc"}>{markdownData}</ReactMarkdown>
                </div>
            </div>
            
        </div>
    );
}