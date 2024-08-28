import { useParams, useLocation } from "react-router-dom";
import "../styles/ProjectPage.css";
import { fetchOneProject } from "../services/apiServices";
import Gallery from "./Gallery";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export const ProjectPage = (props) =>{
    
    const params = useParams();         //used to get the project id in url
    const location = useLocation();     //used to get the current page location

    const [project, setProject] = useState();               //used to store the data of the page's project
    const [markdownData, setMarkdownData] = useState("");   //used for converting the markdown data to html

    useEffect(() => {

        //getting the page's project data
        const getProjectData = async () => {

            //get the id from the page url to identify which project to fetch
            const pageSegments = location.pathname.split('/'); 
            const section = '/' + pageSegments[1];

            const data = await fetchOneProject(section, params.id); //fetch the proj data based on the project section and project id (from url)
            setProject(data);                                       //store the data that was fetched

            //if the data has a markdown path
            if(data && data.markdownPath){
                const response = await fetch(data.markdownPath);    //fetch the markdown file 
                const markdownText = await response.text();         //convert the data to text
                setMarkdownData(markdownText);                      //save the markdown data
            }

        }

        getProjectData();   //call the function to get the project data

    }, [location]);

    return (
        <div className="background">
            <div className="proj-title-container">
                <h1 className="proj-title">{project && project.title}</h1>
                <p className="date">{project && project.date}</p>
            </div>
            <div className="content-container">
                {project ? <Gallery imagePath={project.mediaPath} images={project.images}/> : ""}
                {project && project.videos ? (
                    project.videos.map((video, index) => (
                        <iframe
                            key={index}
                            className="video"
                            src={`${video.vidSrc}&origin=${window.location.origin}`}
                            title={`YouTube video player - ${index}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    ))
                ) : ""}
                {project && project.pdfs ? (
                    project.pdfs.map((pdf, index) => (
                        <>
                            <iframe
                                src={`${pdf.driveLink}`}
                                key={index}
                                title={`${pdf.title} PDF Viewer`}
                                className="pdf-viewer"
                                type="application/pdf"
                                loading="lazy"
                            ></iframe>
                            <a href={`${project.mediaPath}${pdf.pdfSrc}`} 
                               target="_blank" rel="noopener noreferrer"
                               className="pdf-newtab-link">View {pdf.title} on separate tab</a>
                        </>
                    ))
                ) : ""}
                <div className="desc-container">
                    <h1 className="proj-about-title"><span className="thick">about</span> <span className="thin">{project && project.title}</span></h1>
                    <ReactMarkdown className={"md-desc"}>{markdownData}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}