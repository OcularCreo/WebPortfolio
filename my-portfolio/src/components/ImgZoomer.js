import { useState, useRef, useEffect } from "react"
import "../styles/ImgZoomer.css";

export const ImgZoomer = ({src, miniSrc, alt, setParentScale, setParentDrag}) => {

    const [scale, setScale] = useState(1);                              //sets the scale of the img
    const [position, setPosition] = useState({x: 0, y: 0});             //sets the position of the img while panning
    const [isDragging, setIsDragging] = useState(false);                //helps identify if the image is being dragged
    const [transformOrig, setTransformOrig] = useState({x: 0, y: 0});   //sets the transformation origin of the image
    const [lastMousePos, setLastMousePos] = useState({x: 0, y: 0});     //keeps track of the last position of the mouse
    const [isLoaded, setIsLoaded] = useState(false);                    //used to keep track of this image has been loaded

    const containerRef = useRef(null);  //reference to the parent element container of the image element
    const imgRef = useRef(null);        //reference to the image element

    //whenever the scale is changed to 1 reset the positon back to 0, 0
    useEffect (() => {
        if(scale === 1) {
            setPosition({x: 0, y: 0});
        }
    }, [scale]);

    //if the image source has been changed and the scale is not at 1, reset transformations
    useEffect(() => {
        if(scale !== 1) {
            setScale(1);
            setTransformOrig({x: 0, y: 0});
            setPosition({x: 0, y: 0});
            setIsDragging(false);
        }
    }, [src]);

    //helper function for finding the mouse position
    const getCursorPosition = (pos) => {

        //calculate the click position relative to the image container
        const {left, top} = containerRef.current.getBoundingClientRect();
        const clickX = pos.x - left; 
        const clickY = pos.y - top;

        //return the mouse position
        return {x: clickX, y: clickY};
    }

    //function used for when the parent container is double clicked
    const handleDoubleClick = (e) => {
        
        const mousePos = getCursorPosition({x: e.clientX, y: e.clientY});
        doubleInputScale(mousePos);

    }

    //helper function for a double click or double tap. Scales the image accordingly, either setting it to defined scale or back to scale 1
    const doubleInputScale = (pos) => {

        //if the scale is set to x1, then change the transform origin to the double clicked position and scale it by x2
        if(scale === 1) {
            setTransformOrig({x: pos.x, y: pos.y});
            setScale(1.75);

            if(typeof setParentScale === "function") {
                setParentScale(1.75);
            }

        } else {
            setScale(1);    //otherwise reset the scale back to x1

            if(typeof setParentScale === "function") {
                setParentScale(1);
            }
        }

    }

    //function used for when attempting to pan with the image
    const handleMouseDown = (e) => {
        enableDrag({x: e.clientX, y:e.clientY});    //using helper function
    }

    //function used to track mouse movement over the parent container of the image element
    const handleMouseMove = (e) => {
        if (!isDragging) return;    //exit the funciton if we are not dragging
    
        //calulate the change in mouse position
        const dx = (e.clientX - lastMousePos.x) / scale; 
        const dy = (e.clientY - lastMousePos.y) / scale;
    
        //update the last mouse position
        setLastMousePos({x: e.clientX, y: e.clientY});

        //acummulate the position - bound their values
        setPosition((prevPosition) => boundPos({x: prevPosition.x + dx, y: prevPosition.y + dy}));
    
    };

    //function bounds how far the image can be dragged when zoomed into. requires current position of the image
    const boundPos = (pos) => {
        const {width, height} = containerRef.current.getBoundingClientRect(); //get the width and height of the original image's dimensions

        //range the mouse can move  vertically and horizontally is calculated as follows
        const horizRange = width / (scale / (scale - 1));
        const vertRange = height / (scale / (scale - 1));
        
        //calculate bounds for x position
        const maxX = horizRange * (transformOrig.x / width);
        const minX = maxX - horizRange;

        //calculte the bounds for the y position
        const maxY = vertRange * (transformOrig.y / height);
        const minY = maxY - vertRange;

        //return the x and y position with the bounding constraints
        return {
            x: Math.max(minX, Math.min(maxX, pos.x)),
            y: Math.max(minY, Math.min(maxY, pos.y)),
        }
    };
    
    //funciton used for when dragging is over
    const disableDrag = () => {
        setIsDragging(false);

        if(typeof setParentDrag === "function"){
            setParentDrag(false);
        }
    }

    //helper function for initializing dragging, requires a position {x, y}
    const enableDrag = (pos) => {
        
        //only allow the beginning of drags if scale is greater than 1
        if(scale > 1) {
            setIsDragging(true);                            //if so set drag to true
            setLastMousePos({x: pos.x, y: pos.y});          //track the last mouse position

            if(typeof setParentDrag === "function"){
                setParentDrag(true);
            }
        }
    }

    //function used to determine how much to rescale the image based on mouse scroll
    const handleScroll = (e) => {
        
        const scaleChange = e.deltaY > 0 ? -0.2 : 0.2;                  //determine the scroll direction, depending on it change the scale by positive or negative value
        const newScale = Math.min(3, Math.max(1, scale + scaleChange)); //add scale change, limit scale range from 1 - 3
        
        //only change the transform position if the scroll is happening while the image is unscaled (scale of 1)
        if(scale === 1) {
            const newOrigPos = getCursorPosition({x: e.clientX, y: e.clientY});
            setTransformOrig({x: newOrigPos.x, y: newOrigPos.y});
        }

        //set the new scale value
        setScale(newScale);

        //if a parent scale function has been passed set the new scale for the parent function
        if(typeof setParentScale === "function") {
            setParentScale(newScale);
        }
    }

    const handleImgLoaded = () => {
        setIsLoaded(true);
    }

    return (
        
        <div 
          className="img-parent"
          ref={containerRef}
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={disableDrag}
          onMouseLeave={disableDrag}
          onWheel={handleScroll}
        >
            {/*Loading parent element - used for loading fxs*/}
            <div 
                className={`blurred-img ${isLoaded ? "loaded" : ""}`}
                style={miniSrc ? {backgroundImage: `url(${miniSrc})`} :{}}
            >
                {/*Image element*/}
                <img
                className="zoom-img"
                draggable={false}
                src={src}
                alt={alt}
                ref={imgRef}
                onLoad={handleImgLoaded}
                loading="lazy"
                style={{
                    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`, 
                    transformOrigin: `${transformOrig.x}px ${transformOrig.y}px`, 
                    transition: isDragging? "none" : `transform 250ms ease-in-out${isLoaded ? "" : ", opacity 0.25s ease-in-out"}`, 
                    cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : ("zoom-in")
                }}
                />
            </div>
        </div>
    )
}