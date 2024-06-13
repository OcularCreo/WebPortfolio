import '../styles/BorderBox.css'

//typical format is title, icon, and description
const BorderBox = (props) =>{

    const items = props.items; 

    return items.map((item) => (
        <div className="box">
            
            <div className="top">
                <h1 className="title">{item.Title}</h1>
            </div>
            <div className="middle">
                <p className="icon">{item.icon}</p>
            </div>
            <div className="bottom">
                <p className="desc">{item.description}</p>
            </div>

        </div>
    ))

}

export default BorderBox;