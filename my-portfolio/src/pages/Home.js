import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { NavBar } from '../components/NavBar';
import { CustomBtn } from "../components/CustomBtn";
import myImage from '../assets/images/4.jpg';

export const Home = () =>{
    return(
        <div style={{overflow: "hidden"}}>
            
            <div className="section-container home-section">
                
                <img src={myImage} className="section-img"></img>
                <div className="section-overlay d-flex align-items-center">
                    
                    <Container>
                        <h1 className="title-1" style={{fontSize: "4rem"}}>JORDAN COOLIGAN PANG</h1>
                        <h3 className="title-2" style={{fontSize: "2.5rem"}}>Multimedia Developer & Designer</h3>
                        <Container className="mt-5">
                            <CustomBtn btnTxt="Resume" className=""/>
                            <CustomBtn btnTxt="Portfolio"/>
                        </Container>
                        
                    </Container>
                </div>
            </div>

            {/* Section 2: About me */}
            <div className="section-about">
                <div className="section-overlay">
                    
                    <p>test stuff hehe</p>

                </div>
            </div>


        </div>
    );
}