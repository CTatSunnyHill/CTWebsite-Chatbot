import React from 'react';
import './NFCStyle.css'

const WPS = (props) => {
    const { url, description } = props;

    return (
        <div className="nfc-container">
        <img src={"/pdf.png"} alt="PDF icon" className="nfc-icon" />
        <a href={url} target="_blank" rel="noopener noreferrer" className="nfc-link-text">
          {description}
        </a>
      </div>

      
    );
};

export default WPS;