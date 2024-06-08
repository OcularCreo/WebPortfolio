import '../styles/BorderBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//typical format is title, icon, and description
const BorderBox = (props) =>{

    const items = props.items; 

    return items.map((item) => (
        <div className="box">
            
            <h1 className="title">{item.Title}</h1>
            <p className="icon">{item.icon}</p>
            <p className="desc">{item.description}</p>

        </div>
    ))

}

export default BorderBox;