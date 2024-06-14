import { useEffect, useState } from "react";
import '../styles/KnowledgeItems.css'

//typical format is title, icon, and description
const KnowledgeItems = (props) =>{

    const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 600); //check if the current width is mobile width

    useEffect(() =>{

        const handleMobileResize = () =>{
            setIsMobileScreen(window.innerWidth <= 600);
        }

        window.addEventListener("resize", handleMobileResize); 

        return () =>{
            window.removeEventListener("resize", handleMobileResize);
        }

    }, []);

    const items = props.items; 

    return items.map((item) => (
        <div className="knowledge-wrapper">
            <p className="icon">{item.icon}</p>
            {isMobileScreen ? 
            <>
                <div className="mobile-wrapper">
                    <h1 className="title">{item.title}</h1>
                    <p className="desc">{item.description}</p>
                </div>
            </>
            : 
            <>
                <h1 className="title">{item.title}</h1>
                <p className="desc">{item.description}</p>
            </>
            }
            
        </div>
    ))

}

export default KnowledgeItems;