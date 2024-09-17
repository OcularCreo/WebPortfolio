import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useRef } from 'react';
import "../styles/ScrollPrompt.css"

export const ScrollPrompt = () => {

    const [scrollY, setScrollY] = useState(0);          //keeps track of current scroll position
    const [playAnim, setPlayAnim] = useState(true);     //keeps track of when to allow the scroll-fade animation happen
    const timerRef = useRef(null);                      //used to determine when to show scroll prompt again
    const [fadeClass, setFadeClass] = useState("");     //class used for fade to transition elements back in

    useEffect(() => {

        //handle scroll function should be triggered on window scroll events
        const handleScroll = () => {
            const currentScrollY = window.scrollY;      //save the current window scroll position
            setScrollY(currentScrollY);                 //set scrollY to the current window scroll position

            //check if the currnet scrollY is between 0 and 55 and if the playAnimation boolean is set to false
            if(currentScrollY >=0 && currentScrollY <=80 && !playAnim.current){

                //if so then check if the current timer ref is null
                if(!timerRef.current){

                    //if the current timer ref is null set it to a timer of 10 seconds
                    timerRef.current = setTimeout(() => {
                        setPlayAnim(true);                  //set playAnim to true at the end of 10 seconds
                        timerRef.current = null;            //set the timer ref to null at the end aka clearing it
                        setFadeClass("fade-transition");    //add class to allow fading transition

                        //remove fade class after 1.5 seconds
                        setTimeout(() => {
                            setFadeClass("");
                        }, 1500)

                    }, 10000);
                }

            } else {
                //if not at a position between 0 and 20 scrollY and playAnim is true check for a running timer
                if(timerRef.current) {
                    clearTimeout(timerRef.current); //clear the currently running timer
                    timerRef.current = null;        //set the timer ref to null
                }
            }

        }

        window.addEventListener("scroll", handleScroll);        //add the handleScroll function to a scroll event listener

        return () =>  {
            window.removeEventListener("scroll", handleScroll); //clear the handleScroll function from the scroll event listener when done
                                                                //clear the timer if there's a timer going on
            if(timerRef.current){
                clearTimeout(timerRef.current);
            }
        }

    }, [playAnim]);

    const maxScroll = 200;                                                  //max scroll used to cap animations at scroll distance
    const curOpacity = playAnim ? 1 - Math.min(scrollY / maxScroll, 1) : 0; //calculate opacity based on scroll distance, set to 0 if playAnim is false
    const translateY = Math.min(scrollY / maxScroll * 50, 50);              //translate text based on scroll distance

    //useEffect dependant on updates to curOpacity
    useEffect(() => {

        //when the current opacity reaches 0 set playAnim to false to prevent the elements from appearing when scrolling back up
        const handleAnim = () => {
            if(curOpacity <= 0) {
                setPlayAnim(false);
            }
        }

        handleAnim();

    }, [curOpacity]);

    return (
        <div className={`prompt-bg ${fadeClass}`} style={{opacity: curOpacity}}>
            <div className="prompt-container" style={{transform: `translateY(-${translateY}px)`}}>
                <p id="scroll-txt">Scroll</p>
                <FontAwesomeIcon icon="fa-solid fa-angles-down" />
            </div>
        </div>
    );

}