import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//helper component used to scroll to an element on page load
export const useScrollToElement = () => {

    const location = useLocation();                             //used to track location
    const [scrollTarget, setScrollTarget] = useState(null);     //used to track if element needs to be scrolled to and which one

    useEffect(() => {

        if(scrollTarget) {                                          //when there's an element to scroll to
            const element = document.getElementById(scrollTarget);  //find the element by it's id in the current document

            if(element) {                                           //if an element was found
                element.scrollIntoView({behavior: "smooth"});       //scroll it into view smoothly
                setScrollTarget(null);                              //reset the target element
            }
        }

    }, [location, scrollTarget]);

    //function used to set the scroll target
    const triggerScroll = (elementId) => {
        setScrollTarget(elementId);
    }

    return triggerScroll;   //return the trigger scroll function to change the scroll target

};