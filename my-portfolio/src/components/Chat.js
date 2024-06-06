import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MultiCarousel = () => {

    const data = [
        // Institutions
        {
            Title: "Institutions",
            icon: <FontAwesomeIcon icon="fa-solid fa-building-columns" style={{color: "#ffffff"}} />,
            description: "Carleton University\nAlgonquin College"
        },
        // Degree
        {
            Title: "Degree",
            icon: <FontAwesomeIcon icon="fa-solid fa-graduation-cap" style={{color: "#ffffff"}} />,
            description: "BIT - Interactive Multimedia & Design"
        },
        // Grades
        {
            Title: "Grades",
            icon: <FontAwesomeIcon icon="fa-solid fa-scroll" style={{color: "#ffffff"}} />,
            description: "3.9 GPA\n10.8 CGPA"
        },
    ];

    const [currentIdx, setCurIdx] = useState(1); // Start from the second item to avoid showing the duplicated first item.

    const nextSlide = () => {
        setCurIdx(index => (index === (data.length) ? 1 : index + 1)); // When reaching the last item, go back to the first duplicated item.
    };

    const prevSlide = () => {
        setCurIdx(index => (index === 1 ? data.length : index - 1)); // When reaching the first duplicated item, go back to the last item.
    };

    return (
        <div>
            <div className="carousel">
                {data.map((d, index) => (
                    <div key={index} className="box" style={{ transform: `translateX(${100 * (index - currentIdx)}%)` }}>
                        <h1 className="title">{d.Title}</h1>
                        <p className="icon">{d.icon}</p>
                        <p className="desc">{d.description}</p>
                    </div>
                ))}
                {/* Duplicate the first item at the end */}
                <div className="box" style={{ transform: `translateX(${100 * (data.length - currentIdx)}%)` }}>
                    <h1 className="title">{data[0].Title}</h1>
                    <p className="icon">{data[0].icon}</p>
                    <p className="desc">{data[0].description}</p>
                </div>
            </div>
            <button onClick={prevSlide}>Left</button>
            <button onClick={nextSlide}>Right</button>
        </div>
    );
};

