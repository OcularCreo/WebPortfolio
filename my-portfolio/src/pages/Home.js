import { React, useEffect, useState, useRef } from "react";
import { Container, Button } from "react-bootstrap";
import { CustomBtn } from "../components/CustomBtn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Home.css";

import profileImg from "../assets/images/8.jpg";
import { MultiCarousel } from "../components/MultiCarousel.js";
import BorderBox from "../components/BorderBox.js";
import KnowledgeItems from "../components/KnowledgeItems.js";
import { PortfolioBtn } from "../components/PortfolioBtn.js";

export const Home = () =>{

    //array of portfolio section data 
    const portfolioBtnData = [
        {
            title: "Game Dev", 
            icon: <FontAwesomeIcon icon="fa-solid fa-gamepad" />, 
            page: "/gamedev"
        }, 
        {
            title: "Web Dev", 
            icon: <FontAwesomeIcon icon="fa-solid fa-code" />
        }, 
        {
            title: "Photography", 
            icon: <FontAwesomeIcon icon="fa-solid fa-camera" />, 
            page: "/photography"
        }, 
        {
            title: "2d", 
            icon: <FontAwesomeIcon icon="fa-solid fa-square" />
        },
        {
            title: "3d", 
            icon: <FontAwesomeIcon icon="fa-solid fa-cube" />
        },
        {
            title: "Extras", 
            icon: <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
        },
    ];

    //array of education data
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
            description: "BIT & Adv. Dip. A. Arts\nInteractive Multimedia & Design"
        }, 
        
        //Grades
        {
            Title: "Grades", 
            icon: <FontAwesomeIcon icon="fa-solid fa-scroll" style={{color: "#ffffff",}} />, 
            description: "3.9 GPA\n10.8 CGPA"
        }, 
    ]; 

    //array of knowledge/skills containing icons, titles, and descriptions
    const skillItems = [
        
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-gamepad" />, 
            title: "Game Engines", 
            description: "Unity & Unreal Engine"
        },       
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-code" />, 
            title: "Coding Languages", 
            description: "C, C++, C#, Python, Java, HTML, CSS, JavaScript"
        }, 
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-code-branch" />, 
            title: "Version Control", 
            description: "Git, GitHub, GitBash"
        }, 
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-layer-group" />, 
            title: "Front & Backend", 
            description: "React & Django"
        },
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-brush" />, 
            title: "Adobe Suite", 
            description: "Ps, Ai, Lr, Id, Pr, Ae"
        },
        {
            icon: <FontAwesomeIcon icon="fa-solid fa-microscope" />, 
            title: "Testing", 
            description: "Test Automation & Quality Assurance"
        },
    ]; 

    const educationElements = BorderBox({items: educationData});    //create the elements based on the array of data above
    const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 600); //check if the current width is mobile width

    useEffect(() =>{

        console.log("useeffect");

        const handleMobileResize = () =>{
            setIsMobileScreen(window.innerWidth <= 600);
        }

        window.addEventListener("resize", handleMobileResize); 

        return () =>{
            window.removeEventListener("resize", handleMobileResize);
        }

    }, []);

    const portfolioRef = useRef(null);

    const scrollToPortfolio = () =>{
        if(portfolioRef !== null){
            portfolioRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return(
        <div>

            {/* Section 1: Home */}
            <div className="img-section home-section">                          {/* BG image container */}
                <div className="section-overlay d-flex align-items-center">     {/* Image overlay Container */}
                    <Container>
                        
                        {/* Titles headers */}
                        <h1 className="name-title thick">Jordan Cooligan Pang</h1>
                        <h2 className="descr-title">Multimedia Developer & Designer</h2>
                        
                        {/* Buttons Container */}
                        <Container className="btn-container">
                            <CustomBtn btnTxt="Resume"/>
                            <CustomBtn btnTxt="Portfolio" onClick={scrollToPortfolio}/>
                        </Container>
                    </Container>
                </div>
            </div>

            {/* Section 2: About me */}
            <div className="img-section about-section" id="aboutme">{/* BG image container */}                                     
                <div className="section-overlay">                   {/* Image overlay container */}
                    
                    {/* Profile image div */}
                    <div className="profile-div">
                        <img src={profileImg} className="profile-img"></img>
                    </div>

                    {/* Description and links div */}
                    <div className="about-desc">
                        <div className="desc-txt">
                            <h1 className="about-title t1"><span className="thick">about</span> <span className="thin">me</span></h1>
                            <p className="about-p">I have a versatile background, including but not limited to Game Development, Photography, Web Development, and Animation. </p>
                        </div>
                        <div className="about-edu">
                            <h1 className="about-title t2"><span className="thin">my</span> <span className="thick">education</span></h1>
                            {isMobileScreen ? <MultiCarousel className="mt-3" items={educationElements}/> : <div className="edu-box-wrapper">{educationElements}</div>}
                        </div>
                        <div className="about-links">
                            {isMobileScreen ? null : <CustomBtn btnTxt="Resume" />}
                            <div className="about-icons">
                                <a className="about-icon" href=""><FontAwesomeIcon icon="fa-brands fa-github" style={{color: "#ffffff",}} /></a>
                                <a className="about-icon" href=""><FontAwesomeIcon icon="fa-brands fa-linkedin-in" style={{color: "#ffffff",}} /></a>
                                <a className="about-icon" href=""><FontAwesomeIcon icon="fa-regular fa-envelope" style={{color: "#ffffff",}} /></a>
                            </div>
                            {isMobileScreen ? null : <a className="about-email-link" >cooliganpangjordan@gmail.com</a>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Portfolio Selection Section */}
            <div className="portfolio-section">
                <div className="knowledge-section">
                    <h1 className="knowledge-tite"><span className="thin">my</span> <span className="thick">knowledge</span></h1>
                    <div className="items">
                        <KnowledgeItems items={skillItems}/>
                    </div>
                </div>
                <div className="portfolio-selection" ref={portfolioRef}>
                    <h1 className="portfolio-title thick">portfolio</h1>
                    <div className="portfolio-buttons">
                        {
                            portfolioBtnData.map(btnData =>(
                                <PortfolioBtn icon={btnData.icon} title={btnData.title} page={btnData.page}/>
                            ))
                        }
                        
                    </div>
                </div>
            </div>

        </div>
    );
}
