import "../styles/Loading.css";

export const Loading = () => {
    return (
        <div className="loading-container">
            <p className="loading-text">Loading</p>
            <div className="loading-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    );
}