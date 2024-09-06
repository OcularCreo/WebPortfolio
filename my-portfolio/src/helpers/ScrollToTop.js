import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
    
    if(window.history.scrollRestoration) {
        window.history.scrollRestoration = 'manual';
    }

    const { pathname } = useLocation(); //run code when we change the page location

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'auto'; //remove any smooth scrolling
        document.documentElement.scrollTo(0, 0);                //scroll to top of the page
    }, [pathname]);
    
    return null;    //nothing to return lol
}