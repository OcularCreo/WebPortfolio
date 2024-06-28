import { Link } from "react-router-dom";

export default function NotFoundPage (){
    return (
        <>
            <h3>404 Not Found</h3>
            <Link to="/">Home</Link>
        </>
    );
}