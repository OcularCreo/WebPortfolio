import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { NavBar } from '../components/NavBar';
import { CustomBtn } from "../components/CustomBtn";
import myImage from '../assets/images/4.jpg';

export const Home = () =>{
    return(
        <div style={{overflow: "hidden"}}>
            <div className="section-container">
            <NavBar />
                <img src={myImage} className="section-img"></img>
                <div className="section-overlay d-flex align-items-center">
                    
                    <Container>
                        <h1 className="title-1" style={{fontSize: "4rem"}}>JORDAN COOLIGAN PANG</h1>
                        <h3 className="title-2" style={{fontSize: "2.5rem"}}>Multimedia Developer & Designer</h3>
                        <Container className="mt-5">
                            <CustomBtn btnTxt="Resume" className=""/>
                            <CustomBtn btnTxt="Portfolio"/>
                        </Container>
                        
                        {/*

                        <Container className="mt-5">
                            <Row fluid className="justify-content-center">
                                <Col className="col-6 col-md-3 col-lg-2 mb-2 mx-1">
                                    <Button variant="outline-light rounded-pill border-2" className="w-100" size="lg">
                                        <span className="title-4">RESUME</span>
                                    </Button>
                                </Col>
                                <Col className="col-6 col-md-3 col-lg-2 mb-2 mx-1">
                                    <Button variant="outline-light rounded-pill border-2" className="w-100" size="lg">
                                        <span className="title-4">PORTFOLIO</span>
                                    </Button>
                                </Col>
                            </Row>
                        </Container>

                        */}
                    </Container>
                </div>
            </div>
            <div style={{height: "100px"}}></div>
        </div>
    );
}