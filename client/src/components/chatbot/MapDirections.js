import React from 'react'

const MapDirections = (props) =>{
    const iframeSrc = `https://www.google.com/maps/embed/v1/${props.mapMode}?key=${props.apiKey}&origin=${encodeURIComponent(props.origin)}&destination=${encodeURIComponent(props.destination)}&zoom=${props.zoom}&maptype=${props.maptype}&avoid=${encodeURIComponent('tolls|highways')}`
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <iframe
                title="Google Map"
                width="270" // Adjust as needed
                height="270"
                frameborder="0"
                style={{border:0}}
                referrerpolicy="no-referrer-when-downgrade"
                src={iframeSrc}
                allowfullscreen>
            </iframe>
        </div>
    )

}
export default MapDirections