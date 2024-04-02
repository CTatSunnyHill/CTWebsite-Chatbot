import React from 'react'
import './Message.css'; // Assuming you have a separate CSS file for styles

const Message = (props) => {
    const isBot = props.speaks === 'bot';

    // Additional classes based on the speaker
    const messageClasses = `message ${isBot ? 'bot-message' : 'user-message'}`;

    return (
        <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className={messageClasses}>
                {isBot && (
                    <img src="/CT.png" alt="Bot" className="bot-logo" />
                )}
                <div className="message-text">
                    {props.text}
                </div>
            </div>
        </div>
    );
};

export default Message;