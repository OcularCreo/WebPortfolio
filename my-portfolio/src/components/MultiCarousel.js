
import { useState, useEffect } from "react";
import "../styles/Education.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MultiCarousel = () =>{

    const data = [
        
        //Institutions
        {
            Title: "Instituions", 
            icon: <FontAwesomeIcon icon="fa-solid fa-building-columns" style={{color: "#ffffff",}} />, 
            description: "Carleton University\nAlgonquin College"
        }, 
        
        //Degree
        {
            Title: "Degree", 
            icon: <FontAwesomeIcon icon="fa-solid fa-graduation-cap" style={{color: "#ffffff",}} />, 
            description: "BIT - Interactive Multimedia & Design"
        }, 
        
        //Grades
        {
            Title: "Grades", 
            icon: <FontAwesomeIcon icon="fa-solid fa-scroll" style={{color: "#ffffff",}} />, 
            description: "3.9 GPA\n10.8 CGPA"
        }, 
    ]; 

    const isMobileScreen = window.innerWidth <= 768;    //used to determine if the screen is currently at a moblie size
    const [currentIdx, setCurIdx] = useState(0);        //used to track the current slide index

    //function for moving to the next slides
    function nextSlide(){
        
        //set the current index with the following logic
        setCurIdx(index =>{
            if(index === (data.length -1)) {
                return 0;           //if you're at the last index, loop back to the first
            } else {
                return index + 1;   //otherwise add one to the current index
            }
        })
    }

    //funciton for moving to the previous slide
    function prevSlide(){
        
        //set the current index with the following logic
        setCurIdx(index =>{
            if(index === 0) {
                return data.length -1; //if you're at the first index, loop back to the last
            } else {
                return index - 1;      //otherwise subtract one from the current index
            }
        })
    }

    return (
        <div>
            <div className="carousel">
                {
                    //loop through all indexes in data, create the following elements
                    data.map((d) => (
                        <div className="box" style={{translate: `${-100 * currentIdx}%`}}>
                            
                            <h1 className="title">{d.Title}</h1>
                            <p className="icon">{d.icon}</p>
                            <p className="desc">{d.description}</p>

                        </div>
                    ))
                }
            </div>
            <button onClick={prevSlide}>Left</button>
            <button onClick={nextSlide}>Right</button>
        </div>
        
    );

}