import '../styles/KnowledgeItems.css'

//typical format is title, icon, and description
const KnowledgeItems = (props) =>{

    const items = props.items; 

    return items.map((item) => (
        <div className="knowledge-wrapper">
            <p className="icon">{item.icon}</p>
            <h1 className="title">{item.title}</h1>
            <p className="desc">{item.description}</p>
        </div>
    ))

}

export default KnowledgeItems;