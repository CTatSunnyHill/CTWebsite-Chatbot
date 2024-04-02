import React from 'react'
import './QuickReply.css'


const QuickReply = (props) => {
        return (   
                <button 
                    className="quick-reply-btn"
                    onClick={(event) => 
                        props.click(
                            event, 
                            props.reply.structValue.fields.payload.stringValue, 
                            props.reply.structValue.fields.text.stringValue
                        )
                    }>
                    {props.reply.structValue.fields.text.stringValue}
                </button>
        )

}

export default QuickReply;