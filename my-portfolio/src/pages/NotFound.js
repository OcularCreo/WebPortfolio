import "../styles/NotFound.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    
    const navigate = useNavigate();

    const navToHome = () => {
        navigate('/');
    }

    const [message, setMessage] = useState();

    //function returns a special message which includes the current date
    const getCurrentDate = () => {
        const today = new Date(); 

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const ordinals = ["th", "st", "nd", "rd"];

        const month = months[today.getMonth()]; 
        const date = today.getDate();

        const suffix = ordinals[(date % 10 > 3 || Math.floor(date % 100 === 1)) ? 0 : date % 10];

        //return special message if it is Christmas
        if(date === 25 && month === "December") {
            return "Merry Christmas and Happy Holidays!";
        }

        return <>It's {`${month} ${date}${suffix}`}! <em>WWHACK</em></>;
    }

    const notFoundMessages = [
        {
            quote: "You can't dissapoint a web page if you never found it.", 
            author: "Troy Barnes"
        }, 
        {
            quote: "This is like a season 4 episode... it just doesn't feel right.", 
            author: "Community Reference"
        }, 
        {
            quote: "So many timelines... but this page isn't in any of them.", 
            author: "Community Reference"
        }, 
        {
            quote: 'I lived in New York, Troy. I know what an "404 error" is.', 
            author: "Britta Perry"
        }, 
        {
            quote: "We are 40 light years outside of the Buttermilk Nebula. Althought, it is possible... yeah it's a missing page.", 
            author: "Troy Barnes"
        }, 
        {
            quote: `It's not a request. I'm giving you an "all tomato." Meaning you give me the whole tomato or else.`, 
            author: "Troy Barnes"
        }, 
        {
            quote: "I don't know what to do! My whole brain is crying!", 
            author: "Troy Barnes"
        }, 
        {
            quote: "I think I went too far with this one. I have To go to the bank today and this page is missing.", 
            author: "Dean Craig Pelton"
        }, 
        {
            quote: "Come on, I'm Dean and my hands are so clean, at the moment, the page is missing.", 
            author: "Dean Craig Pelton"
        }, 
        {
            quote: "I need help reacting to something.", 
            author: "Abed Nadir"
        }, 
        {
            quote: "Well I'm a peanut bar and I'm here to say, this page may arrive on another day.", 
            author: "Dean Craig Pelton"
        }, 
        {
            quote: "Look at me. Look at my face. Connect with me. HA HAW HA HA HAUWWWWW!", 
            author: "Dean Craig Pelton"
        }, 
        {
            quotes: [
                {quote: "We have to accept that no one has the page. Don't we?", author: "Jeffrey Winger"}, 
                {quote: "Mmmm...", author: "Study Group"}, 
                {quote: <em>DON'T WE?</em>, author: "Jeffrey Winger"}
            ]
        }, 
        {
            quote: "Whoever insidiously and with great malice aforethought abducted the page, confess, repent, and relinquish so we can leave.", 
            author: "Jeffrey Winger"
        }, 
        {
            quotes: [
                {quote: "But what about the zombies?!", author: "Troy Barnes"}, 
                {quote: "Back burner Troy! This page has to be dealt with!", author: "Jeffrey Winger"}
            ]
        }, 
        {
            quotes: [
                {quote: "This page is made up!", author: "Annie Edison"}, 
                {quote: <><em>Knocks over can</em> - IT'S RIOT TIME, YEAH!!!</>, author: "Neil"}
            ]
        }, 
        {
            quotes: [
                {quote: "Please it's Christmas!", author: "Extra"}, 
                {quote: getCurrentDate(), author: "Shirley Bennett"}
            ]
        }, 
        {
            quote: "This is wrinkling my brain!", 
            author: "Troy Barnes"
        }
    ]

    useEffect(()=> {

        //changing body background styling for this page specifically
        document.body.classList.add("nf-background");

        const randMessage = () => {
            const randIdx = Math.floor(Math.random() * notFoundMessages.length);
            setMessage(notFoundMessages[randIdx]);
        }

        randMessage();

        //reset the body styling when the component is being unmounted
        return () => {
            document.body.classList.remove("nf-background");
        };

    }, []);
    
    return (
        <div className="content-area">
            <div className="glass-container">
                <h1 id="nf-title">404</h1>
                <p id="standard-message">Page Not Found</p>
                <div className="messages-container">
                    {message ?
                        
                        message.quote ? (
                            <>
                                <p className="author"><em>{message.author}</em></p>
                                <p className="quote">{message.quote}</p>
                            </>
                        ) : (

                            message.quotes ? message.quotes.map((quote, index) => (
                                <>
                                    <p className="author"><em>{quote.author}</em></p>
                                    <p className="quote">{quote.quote}</p>
                                </>
                            )): null
                        ) : null
                    }
                </div>
                <button id="home-btn" onClick={navToHome}>Return Home</button>
            </div>
        </div>
    );
    
}