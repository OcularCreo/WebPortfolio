import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchResumes } from "../services/apiServices.js";
import "../styles/Resumes.css";

export const Resumes = () => {
    
    const [resumeData, setResumeData] = useState(null); //variable used for the resume data
    const [isPreview, setIsPreview] = useState(false);  //variable used for determining if resume preview is open
    const [resume, setResume] = useState(null);         //variable used to determine which resume to show in preview mode
    const [isLoading, setIsLoading] = useState(false);   //used to determine if the pdf/resume is loading

    useEffect(()=> {

        //changing body background styling for this page specifically
        document.body.classList.add("resume-bg");

        //fetching resume data asyncronously
        const getResumes = async () => {
            const data = await fetchResumes();  //using fetchresumes and sending the file path location to get related projs
            setResumeData(data ? data : null);  //set the resume data to what was fetch, if there's nothing make it nulls
        }

        getResumes(); //calling get projects for fetching the data

        //reset the body styling when the component is being unmounted
        return () => {
            document.body.classList.remove("resume-bg");
        };

    }, []);

    //toggle function for resume preview, used for opening and closeing the resume preview
    const toggleResumePreview = (resume) => {
        setIsPreview(prev => !prev);    //flip the current state of the boolean of isPreview for turning on or off the preivew
        setResume(resume || null);      //save the passed resume data to the resume variable, if nothing then set it to null
        setIsLoading(true);             //set is loading to true when toggling
    }

    //useeffect used for toggling the resume preview
    useEffect(() => {

        //function tracks if the escape key is pressed, if so then toggle the preview (close it)
        const handleKeyDown = (event) => {
            switch(event.key){
                case "Escape": 
                    toggleResumePreview();
                    break;
                default: 
                    break;
            }
        }

        //add the handlekeydown function to a keydown event listener
        document.addEventListener("keydown", handleKeyDown);

        //remove the event listener when dismounting
        return () => document.removeEventListener("keydown", handleKeyDown);

    }, [isPreview]);

    //used for loading animation when waiting for iframe content to load
    const handleIframeLoad = () => {
        setIsLoading(false);
    }

    //function used to close the preview if a user clicks empty space while previewing a resume
    const handleOverlayClick = (event) => {
        if(event.target === event.currentTarget) {
            toggleResumePreview(null);
        }
    }

    //function used to allow users to download a resume if they choose to do so
    const onPDFDownload = (url) => {

        if(url) {
            const pdfURL = url; 
            const link = document.createElement("a");
            link.href = pdfURL; 
            link.download = pdfURL.split('/').pop(); // Set the filename (optional)
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
    }

    return (
        <div className="content-div">
            
            {isPreview ? 
            (
                <div className="resume-prev" onClick={handleOverlayClick}>
                    <div className="preview-controls"> 
                        <div className="close-title-container">
                            <span className="res-close-icon arrow" onClick={() => toggleResumePreview(null)}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></span>
                            <span className="res-close-icon cross" onClick={() => toggleResumePreview(null)}><FontAwesomeIcon icon="fa-solid fa-xmark" /></span>
                            <p><span className="res-prev-title">Resume</span> | {resume ? resume.type : ""}</p>
                        </div>
                        <button onClick={() => onPDFDownload(resume ? resume.docPath : null)} className="download-btn">Download</button>
                        <button onClick={() => onPDFDownload(resume ? resume.docPath : null)} className="mobile-dl-btn"><FontAwesomeIcon icon="fa-solid fa-file-arrow-down" /></button>
                    </div>
                    {isLoading && (
                        <div className="loading-container"> <p className="loading-txt">Loading <span className="loading-dots">.</span></p> </div>)}
                    <iframe title="resume-preview-window" className="resume-doc" src={resume ? resume.googleSrc : ""} onLoad={handleIframeLoad}></iframe>
                </div>
            ) : (
                <div className="resume-list-container">
                    <h1 id="resumes-title">resumes</h1>
                    <div className="resume-items-container">
                        {resumeData && resumeData.map((resume, index) => (
                            <>
                                <div className="resume-link-txt" onClick={() => toggleResumePreview(resume)}>
                                    <p>{resume.type}</p>
                                    <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                                </div>
                                {index < resumeData.length - 1 ? <hr></hr> : null}
                            </>
                        ))}
                    </div>
                </div>
            )}
        </div>
        
    );

}