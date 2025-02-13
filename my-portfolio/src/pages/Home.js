import { React, useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { CustomBtn } from "../components/CustomBtn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Home.css";
import profileImg from "../assets/images/8.webp";
import smallProfileImg from "../assets/images/scaled_8.webp";
import { MultiCarousel } from "../components/MultiCarousel.js";
import BorderBox from "../components/BorderBox.js";
import KnowledgeItems from "../components/KnowledgeItems.js";
import { PortfolioBtn } from "../components/PortfolioBtn.js";
import { ScrollPrompt } from "../components/ScrollPrompt.js";
import { useNavigate } from "react-router-dom";

export const Home = () =>{

    //array of portfolio section data 
    const portfolioBtnData = [
        {
            id: 0,
            title: "Game Dev", 
            icon: <FontAwesomeIcon icon="fa-solid fa-gamepad" />, 
            page: "/gamedev"
        }, 
        {
            id: 1,
            title: "Web Dev", 
            icon: <FontAwesomeIcon icon="fa-solid fa-code" />, 
            page: "/webdev"
        }, 
        {
            id: 2,
            title: "Photography", 
            icon: <FontAwesomeIcon icon="fa-solid fa-camera" />, 
            page: "/photography"
        }, 
        {
            id: 3,
            title: "2d", 
            icon: <FontAwesomeIcon icon="fa-solid fa-square" />,
            page: "/2d"
        },
        {
            id: 4,
            title: "3d", 
            icon: <FontAwesomeIcon icon="fa-solid fa-cube" />, 
            page: "/3d"
        },
        {
            id: 5,
            title: "Extras", 
            icon: <FontAwesomeIcon icon="fa-solid fa-circle-plus" />, 
            page: "/extras"
        },
    ];

    //array of education data
    const educationData = [
        
        //Institutions
        {
            id: "0",
            Title: "institutions", 
            icon: <FontAwesomeIcon icon="fa-solid fa-building-columns" style={{color: "#ffffff",}} />, 
            description: "Carleton University\nAlgonquin College"
        }, 
        
        //Degrees
        {
            id: "1",
            Title: "Degrees", 
            icon: <FontAwesomeIcon icon="fa-solid fa-graduation-cap" style={{color: "#ffffff",}} />, 
            description: "BIT & Adv. Dip. A. Arts\nInteractive Multimedia & Design"
        }, 
        
        //Grades
        {
            id: "2",
            Title: "Grades", 
            icon: <FontAwesomeIcon icon="fa-solid fa-scroll" style={{color: "#ffffff",}} />, 
            description: "3.9 GPA\n11.02 CGPA"
        }, 
    ]; 

    //array of knowledge/skills containing icons, titles, and descriptions
    const skillItems = [
        
        {
            id: "0",
            icon: <FontAwesomeIcon icon="fa-solid fa-gamepad" />, 
            title: "Game Engines", 
            description: "Unity & Unreal Engine"
        },       
        {
            id: "1",
            icon: <FontAwesomeIcon icon="fa-solid fa-code" />, 
            title: "Coding Languages", 
            description: "C, C++, C#, Python, Java, HTML, CSS, JavaScript"
        }, 
        {
            id: "2",
            icon: <FontAwesomeIcon icon="fa-solid fa-code-branch" />, 
            title: "Version Control", 
            description: "Git, GitHub, GitBash"
        }, 
        {
            id: "3",
            icon: <FontAwesomeIcon icon="fa-solid fa-layer-group" />, 
            title: "Front & Backend", 
            description: "React & Django"
        },
        {
            id: "4",
            icon: <FontAwesomeIcon icon="fa-solid fa-brush" />, 
            title: "Adobe Suite", 
            description: "Ps, Ai, Lr, Id, Pr, Ae"
        },
        {
            id: "5",
            icon: <FontAwesomeIcon icon="fa-solid fa-microscope" />, 
            title: "Testing", 
            description: "Test Automation & Quality Assurance"
        },
    ]; 

    const educationElements = BorderBox({items: educationData});    //create the elements based on the array of data above
    const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 600); //check if the current width is mobile width

    useEffect(() =>{

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

    //following code used to navigate to the resume page when the resume button is clicked
    const navigate = useNavigate();
    const navToResumes = () => {
        navigate("/resumes");
    }

    //code used to add loaded class to profile img div, this helps with the loading in effect
    const handleProfileLoad = (imgEl) => {
        imgEl.classList.add('loaded');
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
                            <CustomBtn btnTxt="Portfolio" onClick={scrollToPortfolio}/>
                            <CustomBtn btnTxt="Resume" onClick={navToResumes}></CustomBtn>
                        </Container>
                        
                    </Container>
                    <ScrollPrompt />
                </div>
            </div>

            {/* Section 2: About me */}
            <div className="img-section about-section" id="aboutme">{/* BG image container */}                                     
                <div className="section-overlay">                   {/* Image overlay container */}
                    
                    {/* Profile image div */}
                    <div className="profile-div">
                        <div className="profile-img">
                            <div className="blured-img" style={{backgroundImage: `url(${smallProfileImg})`}}>
                                <img src={profileImg} loading="lazy" onLoad={(e) => handleProfileLoad(e.target.parentElement)} className="profile-img" alt="Jordan Cooligan Pang Headshot"></img>
                            </div>
                        </div>
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
                            {isMobileScreen ? null : <CustomBtn btnTxt="Resume" onClick={navToResumes}></CustomBtn>}
                            <div className="about-icons">
                                <a  className="about-icon" 
                                    href="https://github.com/OcularCreo" 
                                    target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-brands fa-github" style={{color: "#ffffff",}} /></a>
                                <a  className="about-icon" 
                                    href="https://linkedin.com/in/jordan-cooligan-pang-1b2a7721b" 
                                    target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-brands fa-linkedin-in" style={{color: "#ffffff",}} /></a>
                                <a  className="about-icon" 
                                    href="mailto:cooliganpangjordan@gmail.com" 
                                    target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-regular fa-envelope" style={{color: "#ffffff",}} /></a>
                            </div>
                            {isMobileScreen ? null : <a className="about-email-link" 
                                                        href="mailto:cooliganpangjordan@gmail.com"
                                                        target="_blank" rel="noopener noreferrer" >cooliganpangjordan@gmail.com</a>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Portfolio Selection Section */}
            <div className="portfolio-section">
                <div className="knowledge-section">
                    <h1 className="knowledge-tite"><span className="thin">my</span> <span className="thick">knowledge</span></h1>
                    <div className="knowledge-items-container">
                        <KnowledgeItems items={skillItems}/>
                    </div>
                </div>
                <div className="portfolio-selection" ref={portfolioRef}>
                    <h1 className="portfolio-title thick">portfolio</h1>
                    <div className="portfolio-buttons">
                        {
                            portfolioBtnData.map(btnData =>(
                                <PortfolioBtn key={btnData.id} icon={btnData.icon} title={btnData.title} page={btnData.page}/>
                            ))
                        }
                        
                    </div>
                </div>
            </div>

        </div>
    );
}
