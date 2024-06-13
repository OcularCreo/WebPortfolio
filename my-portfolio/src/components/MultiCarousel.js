import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/MultiCarousel.css";

export const MultiCarousel = ({className, items}) =>{

    const carouselItems = Array.from(items);  //extend the items list for the infinite loop
    const extendedItems = [carouselItems[carouselItems.length -1], ...carouselItems, carouselItems[0]];

    const [currentIdx, setCurIdx] = useState(1);        //used to track the current slide index
    const carouselRef = useRef();                       //used to keep a reference of the carousel div

    //handles the carousel actions moving either to the next or previous
    const actionHandler = (mode) =>{
        
        const children = Array.from(carouselRef.current.children);  //get the children of the carousel array here

        //add the transition duration back here (incase it was removed)
        children.map(child =>{ child.style.transitionDuration = "300ms"; });
        
        //if the passed mode is previous and the current index is not equal to 0
        if(mode === "prev" && currentIdx !== 0){
            setCurIdx(currentIdx - 1);
        } 
        //if the passed mode is next and the current index is not equal to the last index
        else if(mode === "next" && currentIdx !== (extendedItems.length -1)){
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
                    setCurIdx(extendedItems.length -2);
                } 
                //if the current index is the last index, set duration to 0 and then set curIdx to second index
                else if (currentIdx === (extendedItems.length -1)){
                    child.style.transitionDuration = "0ms";
                    setCurIdx(1);
                }
                
            })
        }; 

        //add the event listener to the dom
        carouselRef.current.addEventListener("transitionend", transitionEnd);

        //clean up the event listener
        return () => {
            if(carouselRef.current) //ensure that carouselRef.currnet isn't null (had some issues with that since I was conditionally rendering this component)
                carouselRef.current.removeEventListener("transitionend", transitionEnd);
        }

    }, [currentIdx]);

    return (
        <div className={`d-flex ${className}`}>
            <button className="carousel-btn btn-r" onClick={() => actionHandler("prev")}><FontAwesomeIcon icon="fa-solid fa-caret-left" /></button>
            <div className="carousel" ref={carouselRef}>
                {
                    extendedItems.map((element) => (
                        <div style={{translate: `${-100 * currentIdx}%`}}>
                            {element}
                        </div>
                    ))
                }
                
            </div>
            <button className="carousel-btn btn-l" onClick={() => actionHandler("next")}><FontAwesomeIcon icon="fa-solid fa-caret-right" /></button>
        </div>
        
    );

}