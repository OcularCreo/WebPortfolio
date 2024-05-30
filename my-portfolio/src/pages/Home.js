import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { CustomBtn } from "../components/CustomBtn";
import "../styles/Home.css";

import testImg from "../assets/images/4.jpg";

export const Home = () =>{
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
                        <Container className="mt-5">
                            <CustomBtn btnTxt="Resume"/>
                            <CustomBtn btnTxt="Portfolio"/>
                        </Container>
                    </Container>
                </div>
            </div>

            {/* Section 2: About me */}
            <div className="img-section about-section">      {/* BG image container */}                                     
                <div className="section-overlay">            {/* Image overlay container */}
                
                </div>
            </div>


        </div>
    );
}