import { useState, useRef, useEffect } from "react"
import "../styles/ImgZoomer.css";

export const ImgZoomer = ({src, alt}) => {

    const [scale, setScale] = useState(1);                              //sets the scale of the img
    const [position, setPosition] = useState({x: 0, y: 0});             //sets the position of the img while panning
    const [isDragging, setIsDragging] = useState(false);                //helps identify if the image is being dragged
    const [transformOrig, setTransformOrig] = useState({x: 0, y: 0});   //sets the transformation origin of the image
    const [lastMousePos, setLastMousePos] = useState({x: 0, y: 0});     //keeps track of the last position of the mouse
    
    const containerRef = useRef(null);  //reference to the parent element container of the image element
    const imgRef = useRef(null);        //reference to the image element

    //whenever the scale is changed to 1 reset the positon back to 0, 0
    useEffect (() => {
        if(scale === 1) {
            setPosition({x: 0, y: 0});
        }
    }, [scale]);

    //function used for when the parent container is double clicked
    const handleDoubleClick = (e) => {
        
        //calculate the click position relative to the image container
        const {left, top} = containerRef.current.getBoundingClientRect();
        const clickX = e.clientX - left; 
        const clickY = e.clientY - top;
 
        //if the scale is set to x1, then change the transform origin to the double clicked position and scale it by x2
        if(scale === 1) {
            setTransformOrig({x: clickX, y: clickY});
            setScale(2);
        } else {
            setScale(1);    //otherwise reset the scale back to x1
        }

    }

    //function used for when attempting to pan with the image
    const handleMouseDown = (e) => {
        
        //make sure the image has been zoomed into
        if(scale > 1) {
            setIsDragging(true);                                    //if so set drag to true
            setLastMousePos({x: e.clientX, y: e.clientY});          //track the last mouse position
        }
    }

    //function used to track mouse movement over the parent container of the image element
    const handleMouseMove = (e) => {
        if (!isDragging) return;
    
        //calulate the change in mouse position
        const dx = (e.clientX - lastMousePos.x) / scale; 
        const dy = (e.clientY - lastMousePos.y) / scale;
    
        //update the last mouse position
        setLastMousePos({x: e.clientX, y: e.clientY});

        //acummulate the position - bound their values to not allow the image to move outside too far outside of parent div (keeping edges from entering the visible area)
        setPosition((prevPosition) => boundPos({x: prevPosition.x + dx, y: prevPosition.y + dy}));
    
    };

    const boundPos = (pos) => {
        const {width, height} = containerRef.current.getBoundingClientRect(); 

        const horizRange = width / (scale / (scale -1));
        const vertRange = height / (scale / (scale -1));
        
        // Calculate bounds for x position
        let minX, maxX;
    
        maxX = horizRange * (transformOrig.x / width);
        minX = maxX - horizRange;

        let minY, maxY; 

        maxY = vertRange * (transformOrig.y / height);
        minY = maxY - vertRange;

        console.log("Orig x pos: " + transformOrig.x + " | Orig Y pos: " + transformOrig.y);
        console.log("unscaled Width: " + width + " | unscaled Heigth: " + height);
        console.log("pos x: " + pos.x + " | pos y: " + pos.y);
        console.log("MAX x: " + maxX + " | MIN x: " + minX);
        console.log("MAX y: " + maxY + " | MIN y: " + minY);

        return {
            x: Math.max(minX, Math.min(maxX, pos.x)),
            y: Math.max(minY, Math.min(maxY, pos.y)),
        }
    };
    
    //funciton used for when dragging is over
    const handleMouseUp = () => {
        setIsDragging(false);
    }

    const handleMouseClick = (e) => {
        
        const {left, top} = containerRef.current.getBoundingClientRect();
        console.log(e.clientY - top);
    }

    return (
        
        <div 
          className="img-parent"
          ref={containerRef}
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
            <img
                className="zoom-img"
                draggable={false}
                src={src}
                alt={alt}
                ref={imgRef}
                style={{
                    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`, 
                    transformOrigin: `${transformOrig.x}px ${transformOrig.y}px`, 
                    transition:  isDragging? "none" : "transform 250ms ease-in-out"
                }}
            />
        </div>

    )

}