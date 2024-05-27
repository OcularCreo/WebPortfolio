import { useRef } from "react";

export const NavBar = () => {
    
    const navRef = useRef();    //useRef returns obj with single property "current". Used to store ref of DOM element

    //function toggles the current nav ref's classes (removing or adding the class)
    const showNavBar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <a href="#">JCP</a>
            <nav ref={navRef}>
                <a>About</a>
                <button className="nav-btn nav-close-btn" onClick={showNavBar}>close</button>
            </nav>
            <button className="nav-btn" onClick={showNavBar}>hamberger</button>
        </header>
        
    );
}