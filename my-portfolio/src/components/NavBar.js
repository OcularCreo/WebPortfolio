import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export const NavBar = () => {
    
    const [expanded, setExpanded] = useState(false);

    const toggleNavbar = () =>{
        setExpanded(!expanded);
    }
    
    return (
        <Navbar collapseOnSelect bg={expanded ? "dark": "transparent"} expand="lg" expanded={expanded} style={{zIndex: "1000"}}>
            <Container fluid className="px-5">
                <div className="d-flex justify-content-center align-items-center"> {/* Center align for small screens */}
                    <Nav.Link href="#home"><span className="title-1">JCP.</span></Nav.Link>
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleNavbar} variant="dark" className="border-0"/>
                <Navbar.Collapse style={{width: "100%"}} id="responsive-navbar-nav">
                    <Nav varient="underline" className="ms-auto">
                        <Nav.Link><span className="title-3">ABOUT</span></Nav.Link>
                        <Nav.Link><span className="title-3">GAME DEV</span></Nav.Link>
                        <Nav.Link><span className="title-3">PHOTOGRAPHY</span></Nav.Link>
                        <Nav.Link><span className="title-3">WEB DEV</span></Nav.Link>
                        <Nav.Link><span className="title-3">2D</span></Nav.Link>
                        <Nav.Link><span className="title-3">3D</span></Nav.Link>
                        <Nav.Link><span className="title-3">EXTRAS</span></Nav.Link> 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
          
    );
}

{/*

        <Navbar collapseOnSelect expand="lg" bg="transparent" style={{zIndex: "1000"}}>
            <Container fluid className="px-5">
                <Nav>
                    <Nav.Link><span className="title-1">JCP.</span></Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <Nav.Link><span className="title-3">ABOUT</span></Nav.Link>
                    <Nav.Link><span className="title-3">GAME DEV</span></Nav.Link>
                    <Nav.Link><span className="title-3">PHOTOGRAPHY</span></Nav.Link>
                    <Nav.Link><span className="title-3">WEB DEV</span></Nav.Link>
                    <Nav.Link><span className="title-3">2D</span></Nav.Link>
                    <Nav.Link><span className="title-3">3D</span></Nav.Link>
                    <Nav.Link><span className="title-3">EXTRAS</span></Nav.Link>    
                </Nav>
            </Container>
    </Navbar> */}