import { useState } from "react"
import "../styles/ImgZoomer.css";

export const ImgZoomer = ({imgEl}) => {

    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({x: 0, y: 0});

    const handleDoubleClick = (e) => {
        
        const rect = e.target.getBoundingClientRect();      //get the bounding box of the target element

        //calcualte the relative position of the mouse inside of the element (e.clientX/Y give absolute position)
        const offsetX = e.clientX - rect.left; 
        const offsetY = e.clientY - rect.top;
        
        //toggle the scale and change the image position accordingly
        setScale((prevScale) => {
            
            //set the scale to 2 or 1
            const newScale = prevScale === 1 ? 2 : 1;

            //if the new scale is greater than 1
            if (newScale > 1) {

                //calculate the x position factoring in the new scale
                const newX = -(offsetX * newScale - rect.width / 2);
                const newY = -(offsetY * newScale - rect.height / 2);           

                //cap the position using bound position function to prevent the image from moving too far out of frame
                const boundedX = boundPosition(newX, rect.width, newScale);
                const boundedY = boundPosition(newY, rect.height, newScale);

                //set the new position of the image
                setPosition({x: boundedX, y: boundedY});
            } else {

                //make the image scale back to normal when toggling back to a scale of 1
                setPosition({x: 0, y: 0});
            }

            return newScale;    //set the scale variable to the new scale

        });
    }


    const boundPosition = (pos, containerSize, scale) => {
        const imgSize = containerSize * scale; 
        const min = containerSize - imgSize; 
        const max = 0;

        return Math.min(Math.max(pos, min), max);
    }

    return (
        <div className="scaler-transformer" 
            onDoubleClick={handleDoubleClick}
            style={{transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`}}
        >
            {imgEl}    
        </div>
    )

}