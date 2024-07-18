import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Gallery.css";

const Gallery = ({imagePath, images}) => {

    const [currIdx, setCurrIdx] = useState(0);                  //determines the current index of the previewed image
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);  //helps keep track of if the preview image window is open
    const [numImages, setNumImages] = useState(0);              //keeps track of the number of images that were given to the component
    const [gridColStyle, setGridColStyle] = useState("");       //used for setting the number of for the gallery grid

    useEffect(() => {

        setNumImages (images ? images.length : 0); //track the number of images given

        
        if(numImages < 3) {
            setGridColStyle("col-grid-1");  //only make the grid have 1 column if there are less than 3 images
        } else if(numImages < 5) {
            setGridColStyle("col-grid-2");  //only have 2 columns if there are 3-4 images
        } else if(numImages > 0 && numImages > 4) {
            setGridColStyle("col-grid-3");  //allow up to 3 columns if there are more than 4 images
        }

    }, [images]);

    //function used to open the image preview window
    const openImgPreview = (index) => {

        setCurrIdx(index);          //set current index to the index of the image that was clicked
        setIsPreviewOpen(true);     //set is open to true

        document.documentElement.classList.add("no-scroll");    //disable scrolling
    };

    //function used to close the image preview window
    const closeImgPreview = (index) => {
        setIsPreviewOpen(false);                                 //set is preview to false
        document.documentElement.classList.remove("no-scroll");  //re-enable scroll
    };
    
    //function allows user to view the next image while in the preview window
    const nextImg = () => {
        setCurrIdx((prevIdx) => (prevIdx + 1) % images.length);
    };

    //function allows user to view the preview image while in the preview window
    const prevImg = () => {
        setCurrIdx((prevIdx) => (prevIdx - 1 + images.length) % images.length);
    };

    //special function that closes the image preview window when users click on the negative space around the image
    const handleOverlayClick = (e) => {
        if(e.target === e.currentTarget) {
            closeImgPreview();
        }
    }

    return (
        <>
            {/* Gallery Div - Dynamically changes grid style based on num of images given to component */}
            <div className={`gallery ${gridColStyle}`}>
                    
                    {/* Create a div for each given image & dynamically give it tall or wide class based on json data */}
                    {images.map((image, index) => (
                        <div className={`img ${image.tall ? "tall" : ""} ${image.wide ? "wide" : ""}`} 
                             style={{backgroundImage: `url(${imagePath}${image.src})`}}
                             onClick={() => openImgPreview(index)}></div>
                    ))}
            </div>
            
            {/* if isPreviewOpen is true then review the following html */}
            {isPreviewOpen && (
                <div className="preview-overlay" onClick={handleOverlayClick}>
                    
                    {/* CLOSE BUTTON - allows users to close the preview window */}
                    <button className="close-btn" onClick={closeImgPreview}><b><FontAwesomeIcon icon="fa-solid fa-xmark" /></b></button>
                    
                    {/* Image Preivew Navigation Container - holds the navigation for next, previous, and circle buttons */}
                    <div className="next-prev-container">
                        
                        {/* PREVIOUS BUTTON - allows users to view the image PREVIOUS to the currently displayed */}
                        <button className="previous-btn" onClick={prevImg}><FontAwesomeIcon icon="fa-solid fa-caret-left" /></button>

                        {/* CIRCLE NAV BTNS - Only render them if the number of images is between 3 and 12 to not overcrowd or just have 2 dots */}
                        {(numImages > 2 && numImages < 12) && (
                        <div className="dots-container">
                            {images && images.map((image, index) => (
                                <div key={index} onClick={() => openImgPreview(index)} className="circle-item">
                                    {index === currIdx ? <FontAwesomeIcon icon="fa-solid fa-circle" /> : <FontAwesomeIcon icon="fa-regular fa-circle" />}
                                </div>
                            ))}
                        </div>
                        )}
                        
                        {/* NEXT BUTTON - allows users to view the image NEXT to the currently displayed */}
                        <button className="next-btn" onClick={nextImg}><FontAwesomeIcon icon="fa-solid fa-caret-right" /></button>
                    </div>

                    {/* div and image are used to preview the images in their full ratio */}
                    <div className="preview-content">
                        <img src={`${imagePath}${images[currIdx].src}`} alt="" className="preview-img"/>
                    </div>
                </div>
            )}
        </>
        
    );

}

export default Gallery;