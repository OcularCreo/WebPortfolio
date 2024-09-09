import { useEffect } from "react";
import { fetchResumes } from "../services/apiServices.js";
import "../styles/Resumes.css";

export const Resumes = () => {
    
    useEffect(()=> {



    }, []);

    return (
        <div className="content-div">
            <div className="resume-list-container">
                <h1 id="resumes-title">resumes</h1>
                <div className="resume-items-container">

                </div>
            </div>
        </div>
    );

}