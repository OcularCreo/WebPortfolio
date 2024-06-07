import { useState, useEffect, useRef } from "react";
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
    const [currentIdx, setCurIdx] = useState(1);        //used to track the current slide index

    const carouselRef = useRef();                       //used to keep a reference of the carousel div

    const dupData = [data[data.length -1], ...data, data[0]];   //used to display the content of the carousel

    //handles the carousel actions moving either to the next or previous
    const actionHandler = (mode) =>{
        
        const children = Array.from(carouselRef.current.children);  //get the children of the carousel array here

        children.map(child =>{
            child.style.transitionDuration = "300ms";               //add the transition duration back here (incase it was removed)
        })
        
        //if the passed mode is previous and the current index is not equal to 0
        if(mode === "prev" && currentIdx !== 0){
            setCurIdx(currentIdx - 1);
        } 
        //if the passed mode is next and the current index is not equal to the last index
        else if(mode === "next" && currentIdx !== (dupData.length -1)){
            setCurIdx(currentIdx + 1);
        }
    }

    //called whenever currentIdx is changed
    useEffect(() =>{

        //function for transition ends
        const transitionEnd = () =>{

            const children = Array.from(carouselRef.current.children);

            children.map(child =>{

                //if the current index is 0, set transition duration to 0 and then set curIdx to second last index
                if(currentIdx === 0){
                    child.style.transitionDuration = "0ms";
                    setCurIdx(dupData.length -2);
                } 
                //if the current index is the last index, set duration to 0 and then set curIdx to second index
                else if (currentIdx === (dupData.length -1)){
                    child.style.transitionDuration = "0ms";
                    setCurIdx(1);
                }
                
            })
        }; 

        //add the event listener to the dom
        carouselRef.current.addEventListener("transitionend", transitionEnd);

        //clean up the event listener
        return () => {
            carouselRef.current.removeEventListener("transitionend", transitionEnd);
        }

    }, [currentIdx]);

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
            <div className="carousel" ref={carouselRef}>
                {
                    //loop through all indexes in data, create the following elements
                    dupData.map((d) => (
                        <div className="box" style={{translate: `${-100 * currentIdx}%`}}>
                            
                            <h1 className="title">{d.Title}</h1>
                            <p className="icon">{d.icon}</p>
                            <p className="desc">{d.description}</p>

                        </div>
                    ))
                }
            </div>
            <button onClick={() => actionHandler("prev")}>Left</button>
            <button onClick={() => actionHandler("next")}>Right</button>
        </div>
        
    );

}