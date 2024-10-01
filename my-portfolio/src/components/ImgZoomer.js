import { useState, useRef, useEffect } from "react"
import "../styles/ImgZoomer.css";

export const ImgZoomer = ({imgEl}) => {

    const [scale, setScale] = useState(1);
    const [transformOrig, setTransformOrig] = useState({x: 0, y: 0});
    const [position, setPosition] = useState({x: 0, y: 0});
    const [startPos, setStartPos] = useState({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState(false);
    
    const zoomElement = useRef(null);

    const handleDoubleClick = (e) => {
        
        const rect = e.currentTarget.getBoundingClientRect();      //get the bounding box of the target element

        //calcualte the relative position of the mouse inside of the element (e.clientX/Y give absolute position)
        const offsetX = e.clientX - rect.left; 
        const offsetY = e.clientY - rect.top;

        setScale((prevScale) => {

            const newScale = prevScale === 1 ? 3 : 1;

            if(zoomElement !== null) {
                if(newScale > 1) {
                    zoomElement.current.style.transformOrigin = `${offsetX}px ${offsetY}px`;
                    setTransformOrig({x: offsetX, y: offsetY});
                } else {
                    setPosition({x: 0, y: 0});
                }
            }
 
            return newScale;

        });
    }

    const boundPosition = (pos, containerRect, scale) => {
        const unscaledWidth = containerRect.width / scale;
        const unscaledHeight = containerRect.height / scale;

        // Calculate bounds based on transform origin
        const xMin = -(unscaledWidth - transformOrig.x);
        const xMax = transformOrig.x;

        const yMin = -(unscaledHeight - transformOrig.y);
        const yMax = transformOrig.y;

        // Constrain the position within the calculated bounds
        const xBounded = Math.min(Math.max(pos.x, xMin), xMax);
        const yBounded = Math.min(Math.max(pos.y, yMin), yMax);

        return { x: xBounded, y: yBounded };
    };

    const toggleDrag = (e) => {
        if(scale !== 1) {
            setIsDragging(true);
            setStartPos({x: e.clientX - position.x, y: e.clientY - position.y});
        }
    }

    useEffect(() =>{

        const mouseMove = (e) => {
            if(isDragging && zoomElement !== null) {

                const newX = e.clientX - startPos.x;
                const newY = e.clientY - startPos.y;

                const rect = zoomElement.current.getBoundingClientRect();

                setPosition(boundPosition({x: newX, y: newY}, rect, scale));
            }
        }

        const mouseUp = () => {
            if(isDragging) {
                setIsDragging(false);
            }
        }

        window.addEventListener("mouseup", mouseUp);
        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mouseup", mouseUp);
            window.removeEventListener("mousemove", mouseMove);
        }

    }, [isDragging, setStartPos]);

    return (
        
        <div className={`scaler-transformer ${isDragging ? "dragging" : ""}`}
        ref={zoomElement}
        onDoubleClick={handleDoubleClick}
        onMouseDown={toggleDrag}
        style={{transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`}}
        >
            {imgEl}    
        </div>

    )

}