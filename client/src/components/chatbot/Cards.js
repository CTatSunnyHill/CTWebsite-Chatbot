import React from 'react'

import './CardStyle.css'

const Card = (props) => {
    return (
        <div className="card-container">
            <div className="card">
                <div className="card-image">
                    <img alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue} className="card-img"/>
                    <span className="card-title">{props.payload.fields.header.stringValue}</span>
                </div>
                <div className="card-content">
                    {props.payload.fields.description.stringValue}
                </div>
                <div className="card-action">
                    <a target="_blank" rel="noopener noreferrer" href={props.payload.fields.link.stringValue}> LEARN MORE </a>
                </div>
            </div>
        </div>
    )
}

export default Card;



