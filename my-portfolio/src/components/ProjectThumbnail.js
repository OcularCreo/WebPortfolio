import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ProjectThumbnail.css";

export const ProjectThumbnail = (props) =>{

    const location = useLocation();
    const navigate = useNavigate(); 

    const handleClick = () =>{
        navigate(`${location.pathname}/proj/${props.id}`);
    }

    return(
        
        <div className={`img ${props.className}`} 
             style={ props.imgPath ? {backgroundImage: `url(${props.imgPath})`} : ""}
             onClick={handleClick}>
            
            {/* follwing html should only show on hover - displays title if given, otherwise inputs place holder text */}
            <div className="overlay">
                <h2 className="title">{props.title ? props.title: "Project Title"}</h2>
            </div>
        </div>
        
    );
}