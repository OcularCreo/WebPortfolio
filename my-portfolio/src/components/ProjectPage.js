import { useParams, useLocation, useNavigate, Navigate } from "react-router-dom";
import "../styles/ProjectPage.css";
import "../styles/Loading.css";
import { fetchOneProject } from "../services/apiServices";
import Gallery from "./Gallery";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { NotFound } from "../pages/NotFound";

export const ProjectPage = (props) =>{
    
    const params = useParams();         //used to get the project id in url
    const location = useLocation();     //used to get the current page location
    const [error, setError] = useState(false);   //used to show 404 page if the user tries to access a non-existing project

    const [project, setProject] = useState(null);           //used to store the data of the page's project
    const [markdownData, setMarkdownData] = useState("");   //used for converting the markdown data to html

    const [numSkelTxt, setNumSkelTxt] = useState(3);        //used to determine average number of skeleton text lines to create
    const controllerRef = useRef();                         //used to keep track of exiting abort controllers

    useEffect(() => {

        //check if there's already a abort controller, if so abort it
        if(controllerRef.current) {
            controllerRef.current.abort();
        } 

        //create a new abort controller and signal
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;

        //getting the page's project data
        const getProjectData = async () => {

            try {
                //get the id from the page url to identify which project to fetch
                const pageSegments = location.pathname.split('/'); 
                const section = '/' + pageSegments[1];

                const data = await fetchOneProject(section, params.id, { signal }); //fetch the proj data based on the project section and project id (from url)
                setProject(data);                                       //store the data that was fetched

                //check that data has been fetched and if the data has a markdown path
                if(data && data.markdownPath) {
                    const response = await fetch(data.markdownPath, { signal });    //fetch the markdown file 
                    const markdownText = await response.text();         //convert the data to text
                    setMarkdownData(markdownText);                      //save the markdown data
                }
            } catch (error) {
                setError(true); //send user to 404 page if data could not be found
            }
        
        }

        getProjectData();   //call the function to get the project data

        //when dismounting, check if there's an abort controller and abort it if there is one
        return () => {
            if(controllerRef.current){
                controllerRef.current.abort();
            }
        }

    }, [location, params.id]);

    //useeffect for skeleton text elements
    useEffect(() => {

        //function used to dynamically change number of skeleton txt elements depending on window width
        const handleSkelTxtNum = () =>{
            if(window.innerWidth < 600) {
                setNumSkelTxt(7);
            } else if(window.innerWidth < 992) {
                setNumSkelTxt(5);
            } else {    
                setNumSkelTxt(3);
            }
        }

        window.addEventListener('resize', handleSkelTxtNum);    //adding event listener to call haldeSkelTxtNum function
        handleSkelTxtNum();                                     //calling function for first initialization

        return () => window.removeEventListener('resize', handleSkelTxtNum);    //removing event listener when dismounting

    }, []);

    //render the not found page if an error occurs (basically when a non-exisiting project has been attempted to be accessed)
    if(error) {
        return <NotFound />
    }

    return (
        <div className="background">
            <div className="proj-title-container">
                {/* Project page title and date elements - conditionally rendering skeleton or actual elements based on if data is loaded*/}
                {project ? 
                <>
                    <h1 className="proj-title">{project && project.title}</h1>
                    <p className="date">{project && project.date}</p>
                </> 
                : 
                <>
                    <div className="skeleton skeleton-proj-title"></div>
                    <div className="skeleton skeleton-proj-date"></div>
                </>}
            </div>
            <div className="content-container">
                {/* Project Image Gallery - conditionally renders elements or skeleton based on if data is loaded*/}
                {project ? <Gallery imagePath={project.mediaPath} images={project.images}/> :
                    <div className="skel-img-container">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div className="skeleton skel-img" key={i}></div>
                        ))}
                    </div>
                }

                {/* Project Videos */}
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

                {/* Project PDFs */}
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

                {/* Project Descripton container - holds description elements */}
                <div className="desc-container">

                    {/* project about title - conditionaly renders the skeleton title if waiting for data */}
                    {project ? <h1 className="proj-about-title"><span className="thick">about</span> <span className="thin">{project && project.title}</span></h1> : 
                    <div className="skeleton skel-about-title"></div>}

                    {/* Markdown/description element - conditionally renders skeleton elements if waiting for data */}
                    {markdownData ? <ReactMarkdown className={"md-desc"} remarkPlugins={[remarkGfm]}>{markdownData}</ReactMarkdown>: 

                        <div className="skeleton-md-container">
                            {Array.apply(null, {length: 3}).map((_, i) => (
                                <div className="skel-res-exp" key={`skel-res-exp-${i}`}>
                                    <div className="skeleton skel-title" key={`skel-title-${i}`}></div>
                                    {Array.from({ length: numSkelTxt }).map((_, j) => (
                                        <div className="skeleton skel-txt" key={j}></div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}