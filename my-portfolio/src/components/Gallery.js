import { useState, useEffect } from "react";
import "../styles/Gallery.css";

const Gallery = ({imagePath, images}) => {

    const [currIdx, setCurrIdx] = useState(0);

    return (
        <div className="gallery">
                {images.map((image, index) => (
                    <div className={`img ${image.tall ? "tall" : ""} ${image.wide ? "wide" : ""}`} 
                         style={{backgroundImage: `url(${imagePath}${image.src})`}}></div>
                ))}
        </div>
    );

}

export default Gallery;