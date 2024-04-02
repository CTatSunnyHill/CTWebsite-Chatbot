// import React from 'react';

// const Message = (props) => {
//     return (

//         <div className="col s12 m8 offset-m2 l6 offset-l3">
//             <div className="card-panel grey lighten-5 z-depth-1">
//                 <div className="row valign-wrapper">
//                     {props.speaks==='bot' &&
//                     <div className="col s2">
//                         <a href="/" className="btn-floating btn-large waves-effect waves-light red">{props.speaks}</a>
//                     </div>
//                     }
//                     <div className="col s10">
//                       <span className="black-text">
//                         {props.text}
//                       </span>
//                     </div>
//                     {props.speaks==='user' &&
//                     <div className="col s2">
//                         <a href="/" className="btn-floating btn-large waves-effect waves-light red">{props.speaks}</a>
//                     </div>
//                     }
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default Message;

import React from 'react';
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