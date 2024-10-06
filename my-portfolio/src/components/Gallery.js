import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImgZoomer } from "./ImgZoomer";
import "../styles/Gallery.css";

const Gallery = ({imagePath, images}) => {

    const [currIdx, setCurrIdx] = useState(0);                  //determines the current index of the previewed image
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);  //helps keep track of if the preview image window is open
    const [numImages, setNumImages] = useState(0);              //keeps track of the number of images that were given to the component
    const [gridColStyle, setGridColStyle] = useState("");       //used for setting the number of for the gallery grid
    const [touchStart, setTouchStart] = useState(null);         //used for swipping through image previews
    const [touchDistance, setTouchDistance] = useState(0);

    const [scale, setScale] = useState(1);                      //used to tell current image scale
    const [shouldAnim, setShouldAnim] = useState(true);
    const [slideIdx, setSlideIdx] = useState(0);

    useEffect(() => {

        setNumImages (images ? images.length : 0); //track the number of images given

        if(numImages < 3) {
            setGridColStyle("col-grid-1");  //only make the grid have 1 column if there are less than 3 images
        } else if(numImages < 5) {
            setGridColStyle("col-grid-2");  //only have 2 columns if there are 3-4 images
        } else if(numImages > 0 && numImages > 4) {
            setGridColStyle("col-grid-3");  //allow up to 3 columns if there are more than 4 images
        }

    }, [images, numImages]);

    //useEffect watching changes in current index values and number of images
    //following code helps with infinite wrapping illusion, utlizing additional fake images on each end
    useEffect(() => {
        //if the slide index is equal to 0
        if (slideIdx === 0) {
            //wait for the transition animation to end. Then disable animations and set slide idx to the real last image (for infinite illusion)
            setTimeout(() => {
                
                console.log("Wrap Arround: " + slideIdx);
                console.log("Wrap Arround - Set to: " + numImages);

                if(slideIdx === 0) {
                    setSlideIdx(numImages);
                    setShouldAnim(false);
                }
                
            }, 200);
        }

        //if the slide index is equal to numImages + 1 wait for the transition animation to end. Then disable animations and move to the first real image.
        if (slideIdx === numImages + 1) {
            // Jump to the real first image without animation
            setTimeout(() => {
                if(slideIdx === numImages + 1) {
                    setSlideIdx(1);
                    setShouldAnim(false);
                }
            }, 200);
        }
    }, [currIdx, numImages]);

    //useEffect used for key down events when the preview image is open
    useEffect(() => {
        //check which key has been pressed from the passed event
        const handleKeyDown = (event) => {

            switch(event.key) {
                case "Escape": 
                    closeImgPreview();  //close preview if escape key was pressed
                    break; 
                case "ArrowRight": 
                    nextImg();          //go to the next image if the right arrow is pressed
                    break; 
                case "ArrowLeft": 
                    prevImg();          //go to the previous image if the right arrow was pressed
                    break;
                default: 
                    break;              //do nothing if any other key is pressed
            }

        }

        //function used to prevent going to a previous page if the browser back button is pressed while previewing an image
        const handlePopState = (e) => {
            //make sure the preview is open
            if(isPreviewOpen) {
                closeImgPreview();  //close the image if the preview is open
                e.preventDefault(); //prevent navigation to the previous page
            }
        }

        //check if the preview is open
        if(isPreviewOpen) {
            //add an event listener to the document when the preview image ui is open
            document.addEventListener("keydown", handleKeyDown);                    

            //add event listeners to the window. Used for the navigation prevention while previwing an image
            window.history.pushState(null, "", window.location.href);
            window.addEventListener("popstate", handlePopState);

        } else {

            //if the preview is not open (has been close) then remove all the previously added event listeners
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("popstate", handlePopState);
        }

        //remove the event listeners when dismounting.
        return () => {
            window.removeEventListener("popstate", handlePopState);
            document.removeEventListener("keydown", handleKeyDown);
        }

    }, [isPreviewOpen]);

    //function used to open the image preview window
    const openImgPreview = (index) => {

        setCurrIdx(index);          //set current index to the index of the image that was clicked
        setSlideIdx(index + 1);     //set slideIdx to 1 more than the currentIdx
        setIsPreviewOpen(true);     //set is open to true
        
        setShouldAnim(Math.abs(index - currIdx) !== 1 ? false: true);   //only allow animations when moving to an index next to the previous one

        document.documentElement.classList.add("no-scroll");            //disable scrolling
    };

    //function used to close the image preview window
    const closeImgPreview = (index) => {
        setIsPreviewOpen(false);                                 //set is preview to false
        document.documentElement.classList.remove("no-scroll");  //re-enable scroll
    };
    
    //function allows user to view the next image while in the preview window
    const nextImg = () => {
        
        setCurrIdx((prevIdx) => {
            
            //calculate the next current index - wrapps value arround.
            const newCurIdx = (prevIdx + 1) % images.length;
            
            //if the previous index was at the end of the number of images
            if(prevIdx === images.length - 1) {
                setSlideIdx(numImages + 1); //allow slide index to move I more index forward
            } else {
                setSlideIdx(newCurIdx + 1); //otherwise just make slide index 1 more than the new currIdx value
            }
        
            setShouldAnim(true);            //allow animations

            return newCurIdx;
        });

    };

    //function allows user to view the preview image while in the preview window
    const prevImg = () => {
        
        setCurrIdx((prevIdx) => {
            
            //calculate the the next previous index - wrapping around to last index when on the first
            const newCurIdx = (prevIdx - 1 + images.length) % images.length;

            //if the previous index was the first index
            if(prevIdx === 0) {
                setSlideIdx(0); //move slide index to the last index (slide index is always 1 above currIdx so we need to move it back one more)
            } else {
                setSlideIdx(newCurIdx + 1); //otherwise make it 1 more than whateer currIdx's value will be
            }
            
            setShouldAnim(true);

            return newCurIdx;
        });
        
    };

    //special function that closes the image preview window when users click on the negative space around the image
    const handleOverlayClick = (e) => {
        if(e.target === e.currentTarget) {
            closeImgPreview();
        }
    }

    //function keep track of initial position of mobile touch
    const handleTouchStart = (e) => {
        const touchStartX = e.touches[0].clientX; 
        setTouchStart(touchStartX);
        setShouldAnim(false);
    }

    //determines if the user has swiped left or right and changes image based on distance moved
    const handleTouchMove = (e) => {
        
        if(!touchStart) return;
        
        const currentTouchX = e.touches[0].clientX; 
        const distance = currentTouchX - touchStart;

        setTouchDistance(distance);
    }

    const handleTouchEnd = (e) => {
        if(!touchStart) return; 

        const threshold = 25; 
        const swipeSuccess = Math.abs(touchDistance) > threshold; 

        if(swipeSuccess) {
            if(touchDistance < 0) {
                nextImg();
            } else {
                prevImg();
            }
        }

        setTouchDistance(0);
        setTouchStart(null);
    }

    //function uses adds loaded class to parent divs of the image to remove blur and transition to full sizes image
    const handleImgLoad = (imgEl) => {
        imgEl.classList.add('loaded');
    }

    return (
        <>
            {/* Gallery Div - Dynamically changes grid style based on num of images given to component */}
            <div className={`gallery ${gridColStyle}`}>
                    
                    {/* Create a div for each given image & dynamically give it tall or wide class based on json data */}
                    {images.map((image, index) => (
                        <div className={`img ${image.tall ? "tall" : ""} ${image.wide ? "wide" : ""}`} 
                             title={image.imgTitle}
                             key={index}
                             style={{backgroundImage: `url(${imagePath}scaled_${image.src})`}}
                             onClick={() => openImgPreview(index)}>

                            <div className="blured-img">
                                <img src={`${imagePath}${image.src}`} alt="" loading="lazy" className="img-el" onLoad={(e) => handleImgLoad(e.target.parentElement)}/>
                            </div>

                        </div>
                    ))}
            </div>
            
            {/* if isPreviewOpen is true then review the following html */}
            {isPreviewOpen && (
                <div className="preview-overlay" onMouseDown={handleOverlayClick} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                    
                    {/* CLOSE BUTTON - allows users to close the preview window */}
                    <button className="close-btn" onClick={closeImgPreview}><b><FontAwesomeIcon icon="fa-solid fa-xmark" /></b></button>
                    
                    <div className="img-desc-container">
                            <p className="img-desc-txt">{images[currIdx % images.length]?.imgTitle}</p>
                    </div>

                    {/* Image Preivew Navigation Container - holds the navigation for next, previous, and circle buttons */}
                    <div className="next-prev-container">

                        {(numImages > 1 && numImages < 21) && (
                        <>
                            {/* PREVIOUS BUTTON - allows users to view the image PREVIOUS to the currently displayed */}
                            <button className="previous-btn" onClick={prevImg}><FontAwesomeIcon icon="fa-solid fa-caret-left" /></button>
                            
                            {/* RECTANGLE NAV BTNS - Only render them if the number of images is between 3 and 12 to not overcrowd or just have 2 dots */}
                            <div className="img-btn-container">
                                {images && images.map((image, index) => (
                                    <div key={index} 
                                        onClick={() => openImgPreview(index)} 
                                        className={`img-btn-item ${index === currIdx ? "img-btn-cur" : ""}`}>
                                    </div>
                                ))}
                            </div>

                            {/* NEXT BUTTON - allows users to view the image NEXT to the currently displayed */}
                            <button className="next-btn" onClick={nextImg}><FontAwesomeIcon icon="fa-solid fa-caret-right" /></button>
                        </>
                        )}
                        
                    </div>

                    {/* div and image are used to preview the images in their full ratio */}
                    <div className="preview-content">
                        <div className="preview-carousel-container" style={{transform: `translateX(calc(-${(slideIdx) * 100}vw + ${touchDistance}px))`, transition: shouldAnim ? "200ms ease-in-out" : "none"}}>
                            
                            {/* Render the last duplicate image */}
                            <div className="carousel-slide">
                                <ImgZoomer src={`${imagePath}${images[images.length - 1].src}`} alt={images[images.length - 1].imgTitle} />
                            </div>
                            
                            {images.map((image, index) => (
                                <div className="carousel-slide" key={index} onMouseDown={handleOverlayClick}>
                                    <ImgZoomer src={`${imagePath}${image.src}`} alt={image.imgTitle} miniSrc={`${imagePath}scaled_${image.src}`} setParentScale={setScale}/>
                                </div>
                            ))}

                            {/* Render the first duplicate image */}
                            <div className="carousel-slide">
                                <ImgZoomer src={`${imagePath}${images[0].src}`} alt={images[0].imgTitle} />
                            </div>
                        </div>
                    </div>

                    {/* 
                    <div className="preview-content">
                        <ImgZoomer src={`${imagePath}${images[currIdx].src}`} alt={images[currIdx].imgTitle} setParentScale={setScale}/>
                    </div>
                    */}
                </div>
            )}
        </>
        
    );

}

export default Gallery;