import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { CustomBtn } from "../components/CustomBtn";
import "../styles/Home.css";

import profileImg from "../assets/images/8.jpg";

export const Home = () =>{
    
    const handleClick = (event) =>{
        const posX = event.clientX; 
        const posY = event.clientY; 

        console.log(`Clicked at position: ${posX}px, ${posY}px`);
    }


    const updateProfilePos = () =>{

        const vw = window.innerWidth;   //get the viewport width 
        const vh = window.innerHeight;  //get the viewport height

        const imageRatio = 16 / 9;      //calculate the ratio of the image (1920 : 1080)
        const viewportRatio = vw / vh;  //calculate the aspect ratio of the viewport window

        //when the viewport is wider than the image aspect ratio
        if(imageRatio < viewportRatio){

            const scaledRatio = vw / imageRatio;
            

        }

    }


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
            <div className="img-section about-section" onClick={handleClick}>         {/* BG image container */}                                     
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
                        <div className="">
                            <h1 className="about-title t2"><span className="thin">my</span> <span className="thick">services</span></h1>
                        </div>
                        <div className="">
                            <CustomBtn btnTxt="Resume" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
