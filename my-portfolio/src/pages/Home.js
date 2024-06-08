import {React, useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import { CustomBtn } from "../components/CustomBtn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Home.css";

import profileImg from "../assets/images/8.jpg";
import { MultiCarousel } from "../components/MultiCarousel.js";
import BorderBox from "../components/BorderBox.js";

export const Home = () =>{

    const educationData = [
        
        //Institutions
        {
            Title: "Instituions", 
            icon: <FontAwesomeIcon icon="fa-solid fa-building-columns" style={{color: "#ffffff",}} />, 
            description: "Carleton University\nAlgonquin College"
        }, 
        
        //Degrees
        {
            Title: "Degrees", 
            icon: <FontAwesomeIcon icon="fa-solid fa-graduation-cap" style={{color: "#ffffff",}} />, 
            description: "BIT - Interactive\nMultimedia & Design"
        }, 
        
        //Grades
        {
            Title: "Grades", 
            icon: <FontAwesomeIcon icon="fa-solid fa-scroll" style={{color: "#ffffff",}} />, 
            description: "3.9 GPA\n10.8 CGPA"
        }, 
    ]; 

    const educationElements = BorderBox({items: educationData});    //create the elements based on the array of data above
    const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 768); //check if the current width is mobile width

    useEffect(() =>{

        console.log("useeffect");

        const handleMobileResize = () =>{
            setIsMobileScreen(window.innerWidth <= 768);
        }

        window.addEventListener("resize", handleMobileResize); 

        return () =>{
            window.removeEventListener("resize", handleMobileResize);
        }

    }, []);

    return(
        <div>

            {/* Section 1: Home */}
            <div className="img-section home-section">                          {/* BG image container */}
                <div className="section-overlay d-flex align-items-center">     {/* Image overlay Container */}
                    <Container>
                        
                        {/* Titles headers */}
                        <h1 className="name-title">Jordan Cooligan Pang</h1>
                        <h2 className="descr-title">Multimedia Developer & Designer</h2>
                        
                        {/* Buttons Container */}
                        <Container className="btn-container">
                            <CustomBtn btnTxt="Resume"/>
                            <CustomBtn btnTxt="Portfolio"/>
                        </Container>
                    </Container>
                </div>
            </div>

            {/* Section 2: About me */}
            <div className="img-section about-section">         {/* BG image container */}                                     
                <div className="section-overlay">               {/* Image overlay container */}
                    
                    {/* Profile image div */}
                    <div className="profile-div">
                        <img src={profileImg} className="profile-img"></img>
                    </div>

                    {/* Description and links div */}
                    <div className="about-desc">
                        <div className="">
                            <h1 className="about-title t1"><span className="thick">about</span> <span className="thin">me</span></h1>
                            <p className="about-p">I have a versatile background, including but not limited to Game Development, Photography, Web Development, and Animation. </p>
                        </div>
                        <div className="about-edu">
                            <h1 className="about-title t2"><span className="thin">my</span> <span className="thick">education</span></h1>
                            {isMobileScreen ? <MultiCarousel items={educationElements}/> : <div className="edu-box-wrapper">{educationElements}</div>}
                        </div>
                        <div className="about-links">
                            <CustomBtn btnTxt="Resume" />
                            <a className="about-icon" href=""><FontAwesomeIcon icon="fa-brands fa-github" style={{color: "#ffffff",}} /></a>
                            <a className="about-icon" href=""><FontAwesomeIcon icon="fa-brands fa-linkedin-in" style={{color: "#ffffff",}} /></a>
                            <a className="about-icon" href=""><FontAwesomeIcon icon="fa-regular fa-envelope" style={{color: "#ffffff",}} /></a>
                            <a className="about-email-link" >cooliganpangjordan@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
